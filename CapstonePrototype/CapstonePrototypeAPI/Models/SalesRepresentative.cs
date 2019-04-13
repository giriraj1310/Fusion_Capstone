using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstonePrototypeAPI.Models {
    [BsonIgnoreExtraElements]
    public class SalesRepresentative {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("contact")]
        public Contact Contact { get; set; }

        [BsonElement("location")]
        public Location Location { get; set; }

        [BsonElement("savedBusinesses")]
        public List<Business> SavedBusinesses { get; set; }

        [BsonConstructor]
        public SalesRepresentative(Contact contact) {
            Contact = contact;
        }
    }
}
