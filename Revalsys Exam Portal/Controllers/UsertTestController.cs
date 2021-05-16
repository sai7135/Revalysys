using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "User")]
    public class UsertTestController : ControllerBase
    {
        private IRepository _rep;
        public UsertTestController(IRepository rep)
        {
            this._rep = rep;
        }

        [HttpGet, Route("Test")]
        public async Task<IActionResult> AllTests()
        {
            try
            {
                List<TestDuration> values = await _rep.AllTests();
                return Ok(values);
            }
            catch (Exception e)
            {
                throw;
            }
        }
        [HttpGet, Route("TestData")]
        public async Task<IActionResult> AllTestData([FromQuery(Name = "TestName")]string TestName) 
        {
            try
            {
                List<Test> value = await _rep.GetTestData(TestName);
                return Ok(value);
            }
            catch (Exception e) {
                throw;
            }
        }
        [HttpPost, Route("Submit")]
        public async Task<IActionResult> SubmitAnswers(Answers solutions) 
        {
            try
            {
                var name = User.Claims.FirstOrDefault(x => x.Type == "name").Value;
                await _rep.SubmitAnswers(name, solutions) ;
                return Ok();
            }
            catch (Exception e) 
            {
                throw;
            }
        }
    }
}
