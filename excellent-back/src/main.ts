import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix(`api/v${process.env.API_VERSION ?? 1}`);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    });

    const config = new DocumentBuilder()
        .setTitle('API Teste Excellent Sistemas')
        .setDescription('Documentação da API')
        .setVersion(`v${process.env.API_VERSION ?? 1}`)
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'Authorization',
                description: 'Insira o token JWT',
                in: 'header',
            },
            'access-token', // nome da chave
        )
        .build();



    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/docs', app, document);

    await app.listen(process.env.PORT ?? 3000);

    console.log(`Application is running on: ${process.env.PORT}`);
}
bootstrap();
