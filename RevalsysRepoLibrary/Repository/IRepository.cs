using Revalsys_Data_Library.DtoModels;
using Revalsys_Data_Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RevalsysRepoLibrary.Repository
{
    public interface IRepository
    {
        Task<bool> SignUpUser(SignUpModel model);
        Task<string> UserLogin(SignInModel model);
        Task<string> GetEmail(string name);
        Task<bool> SignUpAdmin(SignUpModel model);
        Task<string> AdminLogin(SignInModel model);
        Task AddQuestion(TestModel model);
        Task AddTest(TestDuration model);
        Task<List<TestDuration>> AllTests();
        Task<List<Test>> GetTestData(string TestName);
        Task SubmitAnswers(string UserName,Answers Ans);
        Task<List<Result>> GetResults(string TestName);
    }
}
