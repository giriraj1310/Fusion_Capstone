using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstonePrototypeAPI.Models {
    public class Business {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("contact")]
        public BusinessContact Contact { get; set; }

        [BsonElement("location")]
        public Location Location { get; set; }

        [BsonElement("currentProvider")]
        public string CurrentProvider { get; set; }

        [BsonElement("isSaved")]
        public bool IsSaved { get; set; }

        [BsonElement("isFavorited")]
        public bool IsFavorited { get; set; }

        [BsonElement("isReported")]
        public bool IsReported { get; set; }

        [BsonConstructor]
        public Business(BusinessContact contact, Location location) {
            Contact = contact;
            Location = location;
        }
    }
}
