using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstonePrototypeAPI.Models {
    public class Coordinates {
        [BsonElement("latitude")]
        public double Latitude { get; set; }

        [BsonElement("longitude")]
        public double Longitude { get; set; }

        [BsonConstructor]
        public Coordinates(double latitude, double longitude) {
            Latitude = latitude;
            Longitude = longitude;
        }

        public static double DistanceBetween(Coordinates coordinates1, Coordinates coordinates2) {
            return 0;
        }
    }
}
