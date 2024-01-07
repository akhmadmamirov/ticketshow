import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import * as bcrypt from 'bcrypt';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    let {email, password} = req.body

    const existingUser = await User.findOne({email})

    if (existingUser) {
      console.log('Email in use')
      return res.status(400).send('Email in use')
    }

    //Hashing the password and storing user in DB
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
          password = hash
          const user = User.build({email, password})
          await user.save()
          res.status(201).send(user);
      });
    });
    
  }
);

export { router as signupRouter };
