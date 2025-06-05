import type { Request, Response } from 'express'

import { User } from 'src/models/auth/index.js'
import { Project } from 'src/models/project/index.js'


export class TeamController {

  static findUserByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.body
      const { projectId } = req.params

      if (!email) {
        return res.status(400).json({ message: 'Email is required' })
      }
      const user = await User.findOne({ email }).select('_id email name')
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      const project = await Project.findById(projectId)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      const isInTeam = project.team.includes(user.id)
      if (!isInTeam) {
        return res.status(403).json({ message: 'User is not part of this project team' })
      }

      console.log(`User found: ${user.email}`)
      res.status(200).json({ user })

    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static getProyectMembers = async (req: Request, res: Response) => {
    try {
      const project = await Project.findById(req.params.projectId).populate('team')

      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }

      if (!project.team || project.team.length === 0) {
        return res.status(404).json({ message: 'No team members found' })
      }

      res.status(200).json(project.team)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static addUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body
      console.log(id)

      if (!id) {
        return res.status(400).json({ message: 'User ID is required' })
      }
      const user = await User.findById(id).select('_id email name')

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      if (req.project.team.includes(user.id)) {
        return res.status(400).json({ message: 'User is already in the team' })
      }

      req.project.team.push(user.id)
      await req.project.save()
      res.status(200).json({ user })
      console.log(`User added: ${user.email}`)

    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static deleteUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body

      if (!id) {
        return res.status(400).json({ message: 'User ID is required' })
      }

      const user = await User.findById(id).select('_id email name')
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      if (!req.project.team.includes(user.id)) {
        return res.status(400).json({ message: 'User is not in the team' })
      }

      req.project.team = req.project.team.filter((teamMember) => teamMember && teamMember.toString() !== user.id.toString())
      await req.project.save()
      res.status(200).json({ message: 'User removed from team', user })
      console.log(`User removed: ${user.email}`)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}