import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParseDataController } from './controllers/parse-data/parse-data.controller';
import { ParseDataService } from './services/parse-data/parse-data.service';
import { ParseMailController } from './controllers/parse-mail/parse-mail.controller';
import { ParseMailService } from './services/parse-mail/parse-mail.service';

@Module({
  imports: [],
  controllers: [AppController, ParseDataController, ParseMailController],
  providers: [AppService, ParseDataService, ParseMailService],
})
export class AppModule {}
