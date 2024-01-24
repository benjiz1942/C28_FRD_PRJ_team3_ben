import { Global, Module } from '@nestjs/common';
import { ChatGPTService } from './chatGPT.service';

@Global()
@Module({
  providers: [ChatGPTService],
  exports: [ChatGPTService],
})
export class ChatGPTModule {}
