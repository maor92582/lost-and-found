import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateRepoDto } from './dto/createRepoDto.dto';
import { get, request } from 'http';
import { ReportStatus } from './status.enum';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetReportsDto } from './dto/getReportsDto.dto';
import { error } from 'console';
import { SortOrder } from './sort.enum';
import { UpdateReportsDto } from './dto/updateReportDto.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportS: ReportsService) {}
  @Get('/:id')
  getReport(@Param('id') id): Promise<Record<string, any>> {
    return this.reportS.getRById(id).then((report) => report.toJSON());
  }
  @Get(':id/comments')
  getReportcomments(@Param('id') id): Promise<Record<string, any>> {
    return this.reportS.getRById(id).then((report) => report.comments);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateReport(@Param('id') id: string, @Request() req): Promise<void> {
    const dto: UpdateReportsDto = req.body;
    return this.reportS.updateById(id, req.user.sub, dto);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  deleteReport(@Param('id') reportid: string, @Request() req) {
    return this.reportS.deleteById(req.user.sub, reportid);

    // return 'deleted';
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: false }))
  getReports(@Body() dto: GetReportsDto): Promise<Record<string, any>> {
    try {
      console.log(dto);
      const { search, sortBy, sortOrder, limit, page, ...filter } = dto;
      const newf = this.reportS.removeEmpty(filter);
      console.log(sortBy);
      return this.reportS.getReports(
        newf,
        limit,
        page,
        sortBy,
        sortOrder,
        search,
      );
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: false }))
  createReport(@Request() req, @Body() dto: CreateRepoDto): Promise<void> {
    // dto.createdAt = new Date();
    // dto.eventDate = new Date();
    console.log(dto.description, dto.title);
    return this.reportS.createReport(dto, req.user.sub);
  }
  @Post(':id/comments')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: false }))
  createReportcomment(
    @Param('id') reportid,
    @Request() req,
    @Body() dto,
  ): Promise<void> {
    const newdto = { createdAt: new Date(), ...dto };
    console.log(dto.description, dto.title);
    return this.reportS.createComment(newdto, reportid, req.user.sub);
  }
}
