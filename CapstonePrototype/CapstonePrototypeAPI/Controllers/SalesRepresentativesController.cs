using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CapstonePrototypeAPI.Models;
using CapstonePrototypeAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace CapstonePrototypeAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class SalesRepresentativesController : ControllerBase {
        private readonly SalesRepresentativeService _salesRepresentativesService;
        private static bool isLoggedIn = false;

        public SalesRepresentativesController(SalesRepresentativeService salesRepresentativeService) {
            _salesRepresentativesService = salesRepresentativeService;
        }

        [HttpPost("{login}")]
        public async Task<ActionResult<SalesRepresentative>> Login([FromBody]JObject data) {
            string email = data.GetValue("email").ToString();
            string password = data.GetValue("password").ToString();

            SalesRepresentative salesRepresentative = await _salesRepresentativesService.TryLogin(email, password);

            if(salesRepresentative == null) {
                return NoContent();
            }

            isLoggedIn = true;
            return salesRepresentative;
        }

        [HttpGet]
        public async Task<ActionResult<List<SalesRepresentative>>> Get() {
            if(!isLoggedIn) { return Unauthorized(); }

            return await _salesRepresentativesService.Get();
        }
    }
}