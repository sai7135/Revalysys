using Microsoft.EntityFrameworkCore.Migrations;

namespace Revalsys_Data_Library.Migrations
{
    public partial class removetestcolumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "Option5",
                table: "Tests");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Tests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Option5",
                table: "Tests",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
