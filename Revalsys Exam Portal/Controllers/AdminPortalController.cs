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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
    public class AdminPortalController : ControllerBase
    {
        private IRepository _rep;
        public AdminPortalController(IRepository rep) {
            this._rep = rep;
        }
        [HttpPost,Route("AddQuestion")]
        public async Task<IActionResult> AddQuestion(TestModel model)
        {
            try {
                await _rep.AddQuestion(model);
                return Ok();
            }
            catch (Exception e) {
                throw;
            }
        }
        [HttpGet, Route("Test")]
        public async Task<IActionResult> AllTests() 
        {
            try
            {
                List<TestDuration> values = await _rep.AllTests();
                return Ok(values);
            }
            catch (Exception e) {
                throw;
            }
        }
        [HttpGet, Route("GetResults")]
        public async Task<IActionResult> GetResults(string TestName) 
        {
            try
            {
                List<Result> results = await _rep.GetResults(TestName);
                return Ok(results);
            }
            catch (Exception e) {
                throw;
            }
        }
        [HttpPost, Route("AddTest")]
        public async Task<IActionResult> AddTest(TestDuration model)
        {
            try
            {
                await _rep.AddTest(model);
                return Ok();
            }
            catch (Exception e)
            {
                throw;
            }
        }
    }
}
