using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CapstonePrototype {
    public class Startup {
        private readonly IConfiguration _configuration;
        private readonly string googleapis;

        public Startup(IConfiguration configuration) {
            _configuration = configuration;
            googleapis = "_googleapis";
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services) {
            services.AddCors(options => {
                options.AddPolicy(googleapis,
                builder => {
                    builder.WithOrigins("https://maps.googleapis.com")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
            if(env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(googleapis);
            app.UseStaticFiles();
            app.UseMvc(routes => {
                routes.MapRoute("default", "{controller=Main}/{action=Login}/{id?}");
            });
        }
    }
}
