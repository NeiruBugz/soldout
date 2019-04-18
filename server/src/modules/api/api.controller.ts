import { Controller, Get, Param } from '@nestjs/common';
import { ApiService } from './api.service';

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
