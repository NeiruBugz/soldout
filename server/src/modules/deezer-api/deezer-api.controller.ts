import { Controller, Get, Param } from '@nestjs/common';
import { DeezerApiService } from './deezer-api.service';
import { TrackInterface } from '../../interfaces/track.interface';

@Controller('api')
export class DeezerApiController {
  constructor(private readonly apiService: DeezerApiService) {}

  @Get('playlist/:id')
  async getPlaylistById(@Param() id: number): Promise<TrackInterface[]> {
    return await this.apiService.getPlaylistById(id);
  }
}
