using Microsoft.EntityFrameworkCore.Migrations;

namespace Revalsys_Data_Library.Migrations
{
    public partial class AddTestDurations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TestDurations",
                columns: table => new
                {
                    TestName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Hours = table.Column<int>(type: "int", nullable: false),
                    Minutes = table.Column<int>(type: "int", nullable: false),
                    Seconds = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestDurations", x => x.TestName);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestDurations");
        }
    }
}
