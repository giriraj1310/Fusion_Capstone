using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstonePrototypeAPI.Services {
    public abstract class CapstoneDbService {
        protected IMongoDatabase MongoDbDatabase { get; }

        public CapstoneDbService(IConfiguration configuration) {
            MongoClient mongoDbClient = new MongoClient(configuration.GetConnectionString("CapstonePrototypeDb"));
            MongoDbDatabase = mongoDbClient.GetDatabase("CapstonePrototype");
        }
    }
}
