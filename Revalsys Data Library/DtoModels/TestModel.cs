using Microsoft.AspNetCore.Http;

namespace Revalsys_Data_Library.DtoModels
{
    public class TestModel
    {
        public string TestName { get; set; }
        public string Question { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
        public int Answer { get; set; }
    }
}
