import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('chart')
  async getChart(): Promise<any> {
    return await this.apiService.getChart();
  }

  @Get('playlist/:id')
  async getPlaylistById(@Param() id: number): Promise<any> {
    return await this.apiService.getPlaylistById(id);
  }
}
