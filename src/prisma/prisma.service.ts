import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
@Injectable()
//iextends PrismaClient et pour que le PrismaService puisse ecouter les evements de lancement et d'arret dee notre api on  implenet OnModuleInit et OnModuleDestroy
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
//on va definir comment se connecter a la base de donner 
    constructor(){
        //onva recuperer l'url de connexion a la base de donnee
        const connectionString = process.env.DATABASE_URL;
        //on va ensuite créer notre adaptateur  a qui on va passer en argument le connectionstring
        const adapter = new PrismaPg({connectionString})
        //on va revoyer a notre client cet adapter pour quil puisse definire la methode de conncetion a la base 
        super({adapter})
    }

    // vu que on as inplementer ces deux interfaces on as accès a deux methodes qui permettent d' executer du code lorsque lapi est lancer et lorsque lapi est arretée$    
    //lorsque l'API est lancer
    async onModuleInit() {
        // on va demander a prisma de se connecter a la base de donnée grace au importe le prismaClient
        await this.$connect()
        
    }
    //lorsque l'API est arrreter
    
    async onModuleDestroy() {
        await this.$disconnect
    }
}
