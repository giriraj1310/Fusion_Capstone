using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstonePrototypeAPI.Models {
    public class Location {
        [BsonElement("streetAddress")]
        public string StreetAddress { get; set; }

        [BsonElement("city")]
        public string City { get; set; }

        [BsonElement("region")]
        public string Region { get; set; }

        [BsonElement("postalCode")]
        public string PostalCode { get; set; }

        [BsonElement("coordinates")]
        public Coordinates Coordinates { get; set; }

        [BsonConstructor]
        public Location(string streetAddress, string city, string region) {
            StreetAddress = streetAddress;
            City = city;
            Region = region;
        }

        [BsonConstructor]
        public Location(Coordinates coordinates) {
            Coordinates = coordinates;
        }

        [BsonConstructor]
        public Location(string postalCode) {
            PostalCode = postalCode;
        }
    }
}
