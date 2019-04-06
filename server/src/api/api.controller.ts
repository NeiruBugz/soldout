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

  @Get('playlist')
  async getPlaylist(@Param() id: number): Promise<any> {
    return await this.apiService.getPlaylist();
  }

  @Get('playlist/:id')
  async getPlaylistById(@Param() id: number): Promise<any> {
    return await this.apiService.getPlaylist(id);
  }

  @Get('track/:id')
  async getTrack(@Param() id: number): Promise<any> {
    return await this.apiService.getTrack(id);
  }

}
