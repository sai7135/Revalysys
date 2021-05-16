using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Revalsys_Data_Library.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Revalsys_Data_Library
{
    public class DatabaseContext : IdentityDbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        public DbSet<UserLogin> UserLogins { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<TestDuration> TestDurations { get; set; }
        public DbSet<Result> Results { get; set; }
    }
}
