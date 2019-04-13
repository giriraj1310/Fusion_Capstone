using CapstonePrototypeAPI.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstonePrototypeAPI.Services {
    public class SalesRepresentativeService : CapstoneDbService {
        private readonly IMongoCollection<SalesRepresentative> _salesRepresentatives;

        public SalesRepresentativeService(IConfiguration configuration) : base(configuration) {
            _salesRepresentatives = MongoDbDatabase.GetCollection<SalesRepresentative>("SalesRepresentatives");
        }

        public async Task<SalesRepresentative> TryLogin(string email, string password) {
            string query = "{$and:[{'contact.email':'" + email + "'}, {'password':'" + password + "'}]}";
            return await _salesRepresentatives.Find(query).FirstOrDefaultAsync();
        }

        public async Task<List<SalesRepresentative>> Get() {
            return await _salesRepresentatives.Find(s => true).ToListAsync();
        }
    }
}
