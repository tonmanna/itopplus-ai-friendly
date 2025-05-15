import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  google?: {
    id: string;
    email: string;
  };
  facebook?: {
    id: string;
    email: string;
  };
  microsoft?: {
    id: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return !this.google && !this.facebook && !this.microsoft;
      },
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    google: {
      id: String,
      email: String,
    },
    facebook: {
      id: String,
      email: String,
    },
    microsoft: {
      id: String,
      email: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>("User", userSchema);
