import { DataSource, ILike, Repository } from 'typeorm';
import { Report } from './report.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateRepoDto } from './dto/request/create-report.dto';
import { string } from 'yargs';
import { IsPositive } from 'class-validator';
import { SortBy, SortOrder } from './sort.enum';
import { filter } from 'rxjs';

export class ReportsRepository extends Repository<Report> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Report, dataSource.createEntityManager());
  }
  async GetAllReports(
    filter,
    limit: number,
    page: number,
    sort,
    Search,
  ): Promise<Report[]> {
    const positivepage = page - 1 > 0 ? page - 1 : 0;
    const skip = limit * positivepage;

    return await this.find({
      relations: { comments: true, user: true },
      where: [
        { ...filter, ...{ title: ILike(`${Search}%`) } },
        { ...filter, ...{ description: ILike(`${Search}%`) } },
      ],
      skip,
      take: limit,
      order: sort,
    });
  }
  async FindReport(search: {}): Promise<Report> {
    try {
      const report = await this.findOne({
        where: search,
        relations: { user: true, comments: true },
      });
      if (report) {
        return report;
      } else throw new NotFoundException();
    } catch (eror) {
      throw new NotFoundException();
    }
  }
  async createreport(dto: CreateRepoDto): Promise<void> {
    const report = this.create(dto);
    report.isResolved = false;
    try {
      await this.insert(report);
    } catch (error) {
      if (error.code == 23505) throw new ConflictException(error);
    }
  }
}
