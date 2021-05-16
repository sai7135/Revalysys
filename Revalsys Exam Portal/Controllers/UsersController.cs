using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Web.Services3.Referral;
using Revalsys_Data_Library.DtoModels;
using Revalsys_Data_Library.Models;
using RevalsysRepoLibrary.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Revalsys_Exam_Portal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IRepository _rep;
        private HttpContext _hcontext;
        public UsersController(IRepository rep,IHttpContextAccessor hacce) {
            _hcontext = hacce.HttpContext;
            _rep = rep;
        }
        [Route("LogIn"), HttpPost]
        public async Task<IActionResult> LoginUser(SignInModel model) {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { Message = "Invalid attempt" });
                }
                string jwtToken =await _rep.UserLogin(model);
                if (jwtToken != null)
                {
                    return Ok(new { Token=jwtToken });
                }
                return BadRequest(new {Message="Invalid username or password"});
            }
            catch
            {
                return BadRequest(new { Message = "There is Some Error! unable to Sign In" });
            }
        }
        [Route("SignUp"),HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody]SignUpModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { Message = "Invalid attempt" });
                }
                bool login =await _rep.SignUpUser(model);
                if (!login) {
                    return BadRequest(new { Message = "User already Exist" });
                }
                return Ok(new { Message="User Created" } );
            }
            catch 
            {
                return BadRequest(new { Message = "There is Some Error! unable to Sign Up" });
            }
        }
        [Route("UserName"), HttpGet,Authorize(AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme,Roles ="User")]
        public async Task<IActionResult> GetUserName(){
            var name = User.Claims.FirstOrDefault(x=>x.Type=="name").Value;

            string Email=await _rep.GetEmail(name);
            if (Email != null)
            {
                return Ok(new { Message = Email });
            }
            else {                             
                return Unauthorized();
            }
        }
    }
}
