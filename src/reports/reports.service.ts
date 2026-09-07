import {
  forwardRef,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CreateRepoDto } from './dto/createRepoDto.dto';
import { UserService } from 'src/user/user.service';
import { GetReportsDto } from './dto/getReportsDto.dto';
import { SortBy, SortOrder } from './sort.enum';
import { UpdateReportsDto } from './dto/updateReportDto.dto';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportsRepository)
    @Inject(forwardRef(() => ReportsRepository))
    private reportsRepository: ReportsRepository,
    @Inject(forwardRef(() => UserService)) private userS: UserService,
    @Inject(forwardRef(() => CommentsService))
    private commentS: CommentsService,
  ) {}

  async getRById(id: string): Promise<Report> {
    return await this.reportsRepository.FindReport({ id });
  }
  async createComment(dto, reportid: string, userid: string): Promise<void> {
    console.log(dto);
    return await this.commentS.createComment(dto, reportid, userid);
  }
  responseHandler(message: string, data?: any) {
    return { message };
  }
  async deleteById(id: string, reportid: string) {
    console.log(id, reportid);
    const reportcreator = await this.checkPerms(id, reportid);
    if (reportcreator != null) {
      await this.reportsRepository.delete(reportcreator.id);
    } else
      throw new HttpException('User does not own report', HttpStatus.FORBIDDEN);
  }
  async checkPerms(id: string, reportid: string): Promise<Report> {
    const reportcreator = await this.getRById(reportid);
    console.log(reportcreator);
    if (!reportcreator) throw new NotFoundException();
    if (reportcreator.user.id == id) {
      return reportcreator;
    } else
      throw new HttpException('User does not own report', HttpStatus.FORBIDDEN);
  }
  //רציתי לעשות עם casl
  async updateById(
    reportId: string,
    MyId: string,
    dto: UpdateReportsDto,
  ): Promise<void> {
    console.log(reportId, MyId, typeof dto.isResolved);
    const reportcreator = await this.checkPerms(MyId, reportId);
    try {
      console.log(dto);
      if (reportcreator != null) {
        console.log(reportcreator);

        Object.keys(dto).forEach((key) => (reportcreator[key] = dto[key]));
        if (String(dto.isResolved) === 'true') reportcreator.isResolved = true;
        else reportcreator.isResolved = false;
        this.reportsRepository.save(reportcreator);
      }
    } catch (error) {
      console.log(error);
    }
  }
  removeEmpty(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null),
    );
  }
  async getReports(
    filter: {},
    limit: number,
    page: number,
    sortBy: SortBy,
    sortOrder: SortOrder,
    search: string,
  ): Promise<Report[]> {
    const sort = {};
    sort[sortBy] = sortOrder;
    console.log(sortBy);
    return await this.reportsRepository.GetAllReports(
      filter,
      limit,
      page,
      sort,
      search,
    );
  }
  async createReport(dto: CreateRepoDto, creatorid: string): Promise<void> {
    const user = await this.userS.getUserById(creatorid);
    dto.user = user;
    console.log(dto);
    return this.reportsRepository.createreport(dto);
  }
}
