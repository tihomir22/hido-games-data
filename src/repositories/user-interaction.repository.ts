import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PajanavajaDbDataSource} from '../datasources';
import {UserInteraction, UserInteractionRelations} from '../models';

export class UserInteractionRepository extends DefaultCrudRepository<
  UserInteraction,
  typeof UserInteraction.prototype.id,
  UserInteractionRelations
> {
  constructor(
    @inject('datasources.PajanavajaDb') dataSource: PajanavajaDbDataSource,
  ) {
    super(UserInteraction, dataSource);
  }
}
