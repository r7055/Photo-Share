using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoShare.Data.Migrations
{
    /// <inheritdoc />
    public partial class addtotagscount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "Tags",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Count",
                table: "Tags");
        }
    }
}
