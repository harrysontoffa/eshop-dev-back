import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
@Injectable()
//iextends PrismaClient et pour que le PrismaService puisse ecouter les evements de lancement et d'arret dee notre api on  implenet OnModuleInit et OnModuleDestroy

//on va definir comment se connecter a la base de donner 

        //onva recuperer l'url de connexion a la base de donnee

        //on va ensuite créer notre adaptateur  a qui on va passer en argument le connectionstring

        //on va revoyer a notre client cet adapter pour quil puisse definire la methode de conncetion a la base 
    // vu que on as inplementer ces deux interfaces on as accès a deux methodes qui permettent d' executer du code lorsque lapi est lancer et lorsque lapi est arretée$    

        // on va demander a prisma de se connecter a la base de donnée grace au importe le prismaClient

    //lorsque l'API est lancer async onModuleInit()
    //lorsque l'API est arrreter async onModuleDestroy() 
 
    //on va importer dans le constructor le configService en variable privée 



export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor(private configService : ConfigService){
        // et maitenant vu que on as notre configService au lieu dutiliser process.env.DATABASE_URL on vva utiliser
        //  la methode get () avec notre 'DATABASE_URL'  en propertyPath pour acceder a nos variables d'environnement
        const connectionString = configService.get('DTABASE_URL');
        const adapter = new PrismaPg({connectionString})
        super({adapter})
    }

    async onModuleInit() {
        await this.$connect()
        
    }
    
    async onModuleDestroy() {
        await this.$disconnect()
    }
}
