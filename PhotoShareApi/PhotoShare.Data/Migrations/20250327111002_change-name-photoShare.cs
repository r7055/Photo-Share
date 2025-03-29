using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoShare.Data.Migrations
{
    /// <inheritdoc />
    public partial class changenamephotoShare : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPhoto_Photos_PhotoId",
                table: "UserPhoto");

            migrationBuilder.DropForeignKey(
                name: "FK_UserPhoto_Users_UserId",
                table: "UserPhoto");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserPhoto",
                table: "UserPhoto");

            migrationBuilder.RenameTable(
                name: "UserPhoto",
                newName: "PhotoShare");

            migrationBuilder.RenameIndex(
                name: "IX_UserPhoto_UserId",
                table: "PhotoShare",
                newName: "IX_PhotoShare_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserPhoto_PhotoId",
                table: "PhotoShare",
                newName: "IX_PhotoShare_PhotoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PhotoShare",
                table: "PhotoShare",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PhotoShare_Photos_PhotoId",
                table: "PhotoShare",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PhotoShare_Users_UserId",
                table: "PhotoShare",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PhotoShare_Photos_PhotoId",
                table: "PhotoShare");

            migrationBuilder.DropForeignKey(
                name: "FK_PhotoShare_Users_UserId",
                table: "PhotoShare");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PhotoShare",
                table: "PhotoShare");

            migrationBuilder.RenameTable(
                name: "PhotoShare",
                newName: "UserPhoto");

            migrationBuilder.RenameIndex(
                name: "IX_PhotoShare_UserId",
                table: "UserPhoto",
                newName: "IX_UserPhoto_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_PhotoShare_PhotoId",
                table: "UserPhoto",
                newName: "IX_UserPhoto_PhotoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserPhoto",
                table: "UserPhoto",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserPhoto_Photos_PhotoId",
                table: "UserPhoto",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserPhoto_Users_UserId",
                table: "UserPhoto",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
