using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Revalsys_Data_Library;
using Revalsys_Data_Library.DtoModels;
using Revalsys_Data_Library.Models;
using RevalsysRepoLibrary.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace RevalsysRepoLibrary.Repository
{
    public class Repository : IRepository
    {
        DatabaseContext _db;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtConfig _jwtConfig;
        private readonly IWebHostEnvironment _environment;
        public Repository(IWebHostEnvironment environment,DatabaseContext db,RoleManager<IdentityRole> roleManager ,UserManager<IdentityUser> userManager,IOptionsMonitor<JwtConfig> optionsMonitor) {
            _db = db;
            _userManager = userManager;
            _environment = environment;
            _jwtConfig = optionsMonitor.CurrentValue;
        }
        public async Task<bool> SignUpUser(SignUpModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Username);
            if (user == null)
            {
                var newUser = new IdentityUser() { Email = model.Username, UserName = model.Username };
                var isCreated = await _userManager.CreateAsync(newUser, model.Password);
                if (isCreated.Succeeded) {
                    await _userManager.AddToRoleAsync(newUser,"User");
                }
                return isCreated.Succeeded;
            }
            else 
            {
                return false;
            }
        }
        public async Task<bool> SignUpAdmin(SignUpModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Username);
            if (user == null)
            {
                var newUser = new IdentityUser() { Email = model.Username, UserName = model.Username };
                var isCreated = await _userManager.CreateAsync(newUser, model.Password);
                if (isCreated.Succeeded)
                {
                    await _userManager.AddToRoleAsync(newUser, "Admin");
                }
                return isCreated.Succeeded;
            }
            else
            {
                return false;
            }
        }
        public async Task<string> UserLogin(SignInModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.UserName);
            var role = await _userManager.GetRolesAsync(user);
            if (user != null && role.Contains("User")) 
            {
                var valid = await _userManager.CheckPasswordAsync(user,model.Password);
                if (valid) 
                {
                    var jwtToken = GenrateJwtToken(user,"User");
                    return jwtToken;
                }
            }
            return null;
        }
        public async Task<string> AdminLogin(SignInModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.UserName);
            var role = await _userManager.GetRolesAsync(user);
            if (user != null && role.Contains("Admin"))
            {
                var valid = await _userManager.CheckPasswordAsync(user, model.Password);
                if (valid)
                {
                    var jwtToken = GenrateJwtToken(user, "Admin");
                    return jwtToken;
                }
            }
            return null;
        }
        public async Task<string> GetEmail(string name) 
        {
            var user = await _userManager.FindByEmailAsync(name);
            if (user != null) {
                return user.Email;
            }
            return null;
        }
        private string GenrateJwtToken(IdentityUser user,string role)
        {
            var jwthandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("Id", user.Id),
                    new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Name, user.Email),
                    new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role,role)
                }),
                Expires = DateTime.UtcNow.AddDays(6),
                SigningCredentials=new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256Signature)
            };
            var token = jwthandler.CreateToken(tokenDescriptor);
            var jwtToken = jwthandler.WriteToken(token);
            return jwtToken;
        }

        public async Task AddQuestion(TestModel model)
        {
            string query = $"exec SpinsertTest '{model.TestName}','{model.Question}','{model.Option1}','{model.Option2}','{model.Option3}','{model.Option4}',{model.Answer};";
            await _db.Database.ExecuteSqlRawAsync(query);
        }

        public async Task AddTest(TestDuration model)
        {
            string query = $"exec SpInsertTestDuration '{model.TestName}',{model.Hours},{model.Minutes},{model.Seconds}";
            await _db.Database.ExecuteSqlRawAsync(query);
        }

        public async Task<List<TestDuration>> AllTests()
        {
            List<TestDuration> tests = await _db.TestDurations.FromSqlRaw("exec SpSelecttTest").ToListAsync();
            return tests;
        }

        public async Task<List<Test>> GetTestData(string TestName)
        {
            string query = $"exec SpGetTestData '{TestName}'";
            List<Test> testData = await _db.Tests.FromSqlRaw(query).ToListAsync();
            return testData;
        }

        public async Task SubmitAnswers(string UserName, Answers Ans)
        {
            string queryGetAnswer = $"exec SpGetTestData '{Ans.TestName}'";
            List<Test> Answers = await _db.Tests.FromSqlRaw(queryGetAnswer).ToListAsync();
            int result = 0;
            for (int i = 0; i < Answers.Count; i++){
                if (Ans.Answer[i] == null) 
                {
                    continue;
                }
                if (Int16.Parse(Ans.Answer[i]) == Answers[i].Answer)
                {
                    result += 2;
                }
                else {
                    result--;
                }
            }
            string queryInsertResult = $"exec SpInsertResult '{Ans.TestName}','{UserName}',{result}";
            await _db.Database.ExecuteSqlRawAsync(queryInsertResult);
        }

        public async Task<List<Result>> GetResults(string TestName)
        {
            string query = $"exec SpGetResults '{TestName}'";
            List<Result> results = await _db.Results.FromSqlRaw(query).ToListAsync();
            return results;
        }
    }
}
