using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoShare.Data.Migrations
{
    /// <inheritdoc />
    public partial class addstatusinuserstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "status",
                table: "Users",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: true, 
                oldClrType: typeof(int),
                oldType: "int");
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "status",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");
        }
    }
}
