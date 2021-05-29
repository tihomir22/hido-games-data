import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UserInteraction} from '../models';
import {UserInteractionRepository} from '../repositories';

export class UserInteractionController {
  constructor(
    @repository(UserInteractionRepository)
    public userInteractionRepository : UserInteractionRepository,
  ) {}

  @post('/user-interactions')
  @response(200, {
    description: 'UserInteraction model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserInteraction)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserInteraction, {
            title: 'NewUserInteraction',
            exclude: ['id'],
          }),
        },
      },
    })
    userInteraction: Omit<UserInteraction, 'id'>,
  ): Promise<UserInteraction> {
    return this.userInteractionRepository.create(userInteraction);
  }

  @get('/user-interactions/count')
  @response(200, {
    description: 'UserInteraction model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserInteraction) where?: Where<UserInteraction>,
  ): Promise<Count> {
    return this.userInteractionRepository.count(where);
  }

  @get('/user-interactions')
  @response(200, {
    description: 'Array of UserInteraction model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserInteraction, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserInteraction) filter?: Filter<UserInteraction>,
  ): Promise<UserInteraction[]> {
    return this.userInteractionRepository.find(filter);
  }

  @patch('/user-interactions')
  @response(200, {
    description: 'UserInteraction PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserInteraction, {partial: true}),
        },
      },
    })
    userInteraction: UserInteraction,
    @param.where(UserInteraction) where?: Where<UserInteraction>,
  ): Promise<Count> {
    return this.userInteractionRepository.updateAll(userInteraction, where);
  }

  @get('/user-interactions/{id}')
  @response(200, {
    description: 'UserInteraction model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserInteraction, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UserInteraction, {exclude: 'where'}) filter?: FilterExcludingWhere<UserInteraction>
  ): Promise<UserInteraction> {
    return this.userInteractionRepository.findById(id, filter);
  }

  @patch('/user-interactions/{id}')
  @response(204, {
    description: 'UserInteraction PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserInteraction, {partial: true}),
        },
      },
    })
    userInteraction: UserInteraction,
  ): Promise<void> {
    await this.userInteractionRepository.updateById(id, userInteraction);
  }

  @put('/user-interactions/{id}')
  @response(204, {
    description: 'UserInteraction PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userInteraction: UserInteraction,
  ): Promise<void> {
    await this.userInteractionRepository.replaceById(id, userInteraction);
  }

  @del('/user-interactions/{id}')
  @response(204, {
    description: 'UserInteraction DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userInteractionRepository.deleteById(id);
  }
}
