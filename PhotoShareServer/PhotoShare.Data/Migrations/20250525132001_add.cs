using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoShare.Data.Migrations
{
    /// <inheritdoc />
    public partial class add : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Massage",
                table: "PhotoShare",
                newName: "Message");

            migrationBuilder.RenameColumn(
                name: "Massage",
                table: "AlbumShare",
                newName: "Message");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Message",
                table: "PhotoShare",
                newName: "Massage");

            migrationBuilder.RenameColumn(
                name: "Message",
                table: "AlbumShare",
                newName: "Massage");
        }
    }
}
