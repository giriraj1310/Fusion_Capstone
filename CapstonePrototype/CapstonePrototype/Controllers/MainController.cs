using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CapstonePrototypeAPI.Services;
using System.Net.Http;
using CapstonePrototype.Models;
using System.Diagnostics;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace CapstonePrototype.Controllers {
    public class MainController : Controller {
        [HttpGet]
        public IActionResult Login() {
            return View();
        }

        [HttpPost]
        public IActionResult Login(LoginCredentials loginCredentials) {
            if(!ModelState.IsValid) {
                return View();
            }

            return RedirectToAction(nameof(Home));
        }

        public IActionResult Home() {
            return View();
        }

        public IActionResult SavedBusinesses() {
            return View();
        }

        public IActionResult Notifications() {
            return View();
        }

        public IActionResult Profile() {
            return View();
        }
    }
}