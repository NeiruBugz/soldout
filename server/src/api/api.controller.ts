import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('chart')
  async getChart(): Promise<any> {
    return await this.apiService.getChart().then(res => res.data);
  }

  @Get('playlist')
  async getPlaylist(@Param() id: number): Promise<any> {
    return await this.apiService.getPlaylist(id).then(res => res.data);
  }

  @Get('track')
  async getTrack(@Param() id: number): Promise<any> {
    return await this.apiService.getTrack(id).then(res => res.data);
  }

}
