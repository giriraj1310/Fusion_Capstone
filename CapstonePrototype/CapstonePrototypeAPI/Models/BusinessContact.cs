using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstonePrototypeAPI.Models {
    public class BusinessContact : Contact {
        [BsonElement("website")]
        public string Website { get; }

        [BsonElement("contactPerson")]
        public Contact ContactPerson { get; set; }

        [BsonElement("businessOwner")]
        public Contact BusinessOwner { get; set; }

        [BsonConstructor]
        public BusinessContact(string name, string email, string phoneNumber, string website) : base(name, email, phoneNumber) {
            Website = website;
        }
    }
}
