import {Entity, model, property} from '@loopback/repository';

@model()
export class UserInteraction extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  gameTag: string;

  @property({
    type: 'string',
    required: true,
  })
  functionExecuted: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created?: string;

  constructor(data?: Partial<UserInteraction>) {
    super(data);
  }
}

export interface UserInteractionRelations {
  // describe navigational properties here
}

export type UserInteractionWithRelations = UserInteraction &
  UserInteractionRelations;
