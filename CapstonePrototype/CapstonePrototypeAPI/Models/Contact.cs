using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstonePrototypeAPI.Models {
    public class Contact {
        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("phoneNumber")]
        public string PhoneNumber { get; set; }

        [BsonConstructor]
        public Contact(string name, string email, string phoneNumber) {
            Name = name;
            Email = email;
            PhoneNumber = phoneNumber;
        }
    }
}
