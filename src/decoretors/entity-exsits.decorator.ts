// import { Injectable } from '@nestjs/common';
// import { InjectDataSource } from '@nestjs/typeorm';
// import { registerDecorator } from 'class-validator';
// import {
//   DataSource,
//   EntityTarget,
//   ObjectLiteral,
//   ObjectType,
//   FindOptionsWhere,
// } from 'typeorm';

// interface BaseEntity {
//   id: string;
// }
// @Injectable()
// export class EntityExists {
//   constructor(private dataSource: DataSource) {}
//   async entityExists<TDto extends BaseEntity, TEntity extends ObjectLiteral>(
//     entityDto: TDto,
//     entityTarget: EntityTarget<TEntity>,
//   ) {
//     if ('id' in entityDto) {
//       const entity = await this.dataSource.manager.find(entityTarget, {
//         where: { id: entityDto.id } as unknown as FindOptionsWhere<TEntity>,
//       });
//       console.log(entity, 'hibye');
//     }
//   }
// }
// export function entityExists<TEntity extends ObjectLiteral>(
//   entityTarget: EntityTarget<TEntity>,
// ) {
//   return function (object: Object, propertyName: string) {
//     registerDecorator({
//       name: 'isEntityExists',
//       propertyName: propertyName,
//       target: object.constructor,
//       constraints: [entityTarget],
//       validator: EntityExists,
//     });
//   };
// }
