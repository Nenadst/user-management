import { Schema, model, models } from 'mongoose';

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Role = models.Role || model('Role', RoleSchema);

export default Role;
