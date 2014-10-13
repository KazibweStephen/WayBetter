namespace WebUI.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class addbetodd : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Bets", "BetOdd", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Bets", "BetOdd");
        }
    }
}
