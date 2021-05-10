using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class PISContext : DbContext
    {
        public PISContext()
        {
        }

        public PISContext(DbContextOptions<PISContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Action> Action { get; set; }
        public virtual DbSet<AssignMenu> AssignMenu { get; set; }
        public virtual DbSet<Band_Desc> Band_Desc { get; set; }
        public virtual DbSet<Belong_To> Belong_To { get; set; }
        public virtual DbSet<Business_Area> Business_Area { get; set; }
        public virtual DbSet<COSTCENTER> COSTCENTER { get; set; }
        public virtual DbSet<Cost_Center_Secondment> Cost_Center_Secondment { get; set; }
        public virtual DbSet<Course_Catalog> Course_Catalog { get; set; }
        public virtual DbSet<Course_Catalog_1> Course_Catalog_1 { get; set; }
        public virtual DbSet<Customer_secondment> Customer_secondment { get; set; }
        public virtual DbSet<DSC_LOGON> DSC_LOGON { get; set; }
        public virtual DbSet<EDUCATE> EDUCATE { get; set; }
        public virtual DbSet<EMP_VIP> EMP_VIP { get; set; }
        public virtual DbSet<EVENT> EVENT { get; set; }
        public virtual DbSet<Employee_data> Employee_data { get; set; }
        public virtual DbSet<GC_PIS> GC_PIS { get; set; }
        public virtual DbSet<Global_Logs> Global_Logs { get; set; }
        public virtual DbSet<Icon> Icon { get; set; }
        public virtual DbSet<Master_D> Master_D { get; set; }
        public virtual DbSet<Master_E> Master_E { get; set; }
        public virtual DbSet<MenuMaster> MenuMaster { get; set; }
        public virtual DbSet<Menu_Structure> Menu_Structure { get; set; }
        public virtual DbSet<NEWS> NEWS { get; set; }
        public virtual DbSet<ORDER> ORDER { get; set; }
        public virtual DbSet<ORDERTYP> ORDERTYP { get; set; }
        public virtual DbSet<PIS_PWD> PIS_PWD { get; set; }
        public virtual DbSet<Person_HI_Info> Person_HI_Info { get; set; }
        public virtual DbSet<Person_Info> Person_Info { get; set; }
        public virtual DbSet<Person_Info_HI> Person_Info_HI { get; set; }
        public virtual DbSet<Person_Info_WF> Person_Info_WF { get; set; }
        public virtual DbSet<Person_WF_Info> Person_WF_Info { get; set; }
        public virtual DbSet<Person_info_WF_BK> Person_info_WF_BK { get; set; }
        public virtual DbSet<Personal_PDMS> Personal_PDMS { get; set; }
        public virtual DbSet<Personel_E_signature> Personel_E_signature { get; set; }
        public virtual DbSet<Personel_HI> Personel_HI { get; set; }
        public virtual DbSet<Personel_Relate> Personel_Relate { get; set; }
        public virtual DbSet<Personel_Relate1> Personel_Relate1 { get; set; }
        public virtual DbSet<Personel_Relate_HI> Personel_Relate_HI { get; set; }
        public virtual DbSet<Personel_Relate_HI_V2> Personel_Relate_HI_V2 { get; set; }
        public virtual DbSet<Personel_Relate_V2> Personel_Relate_V2 { get; set; }
        public virtual DbSet<Personel_Relate_WF> Personel_Relate_WF { get; set; }
        public virtual DbSet<Personel_WF> Personel_WF { get; set; }
        public virtual DbSet<Personel_WP> Personel_WP { get; set; }
        public virtual DbSet<RELATE> RELATE { get; set; }
        public virtual DbSet<Relate_HI> Relate_HI { get; set; }
        public virtual DbSet<Relate_WF> Relate_WF { get; set; }
        public virtual DbSet<Relationship_Course_N_Catalog> Relationship_Course_N_Catalog { get; set; }
        public virtual DbSet<Relationship_Course_N_SESSION> Relationship_Course_N_SESSION { get; set; }
        public virtual DbSet<Report_To> Report_To { get; set; }
        public virtual DbSet<TRAIN> TRAIN { get; set; }
        public virtual DbSet<UNIT_PDMS> UNIT_PDMS { get; set; }
        public virtual DbSet<USER_COOI> USER_COOI { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }
        public virtual DbSet<VW_PERSONAL> VW_PERSONAL { get; set; }
        public virtual DbSet<VW_Staff_Info> VW_Staff_Info { get; set; }
        public virtual DbSet<View2> View2 { get; set; }
        public virtual DbSet<WAREA> WAREA { get; set; }
        public virtual DbSet<additional_data> additional_data { get; set; }
        public virtual DbSet<assign_link> assign_link { get; set; }
        public virtual DbSet<authority> authority { get; set; }
        public virtual DbSet<card_info> card_info { get; set; }
        public virtual DbSet<card_info1> card_info1 { get; set; }
        public virtual DbSet<degree> degree { get; set; }
        public virtual DbSet<directory_info> directory_info { get; set; }
        public virtual DbSet<dtproperties> dtproperties { get; set; }
        public virtual DbSet<edugroup> edugroup { get; set; }
        public virtual DbSet<grplevel> grplevel { get; set; }
        public virtual DbSet<hr_manage> hr_manage { get; set; }
        public virtual DbSet<hr_section> hr_section { get; set; }
        public virtual DbSet<l_log> l_log { get; set; }
        public virtual DbSet<location> location { get; set; }
        public virtual DbSet<log_action> log_action { get; set; }
        public virtual DbSet<major> major { get; set; }
        public virtual DbSet<member_pttgroup> member_pttgroup { get; set; }
        public virtual DbSet<mjgroup> mjgroup { get; set; }
        public virtual DbSet<password> password { get; set; }
        public virtual DbSet<personel_info> personel_info { get; set; }
        public virtual DbSet<personel_info_Bk> personel_info_Bk { get; set; }
        public virtual DbSet<personel_info_view> personel_info_view { get; set; }
        public virtual DbSet<pis_assign> pis_assign { get; set; }
        public virtual DbSet<position> position { get; set; }
        public virtual DbSet<position_view> position_view { get; set; }
        public virtual DbSet<program> program { get; set; }
        public virtual DbSet<pttgroup> pttgroup { get; set; }
        public virtual DbSet<pttgroup_log> pttgroup_log { get; set; }
        public virtual DbSet<role> role { get; set; }
        public virtual DbSet<tbDepartment> tbDepartment { get; set; }
        public virtual DbSet<tbDepartment_bk> tbDepartment_bk { get; set; }
        public virtual DbSet<tbUnit> tbUnit { get; set; }
        public virtual DbSet<tbUnit1> tbUnit1 { get; set; }
        public virtual DbSet<tbUnit1_BK> tbUnit1_BK { get; set; }
        public virtual DbSet<tbUnit_BK> tbUnit_BK { get; set; }
        public virtual DbSet<unit> unit { get; set; }
        public virtual DbSet<unit_20150207> unit_20150207 { get; set; }
        public virtual DbSet<unit_WP> unit_WP { get; set; }
        public virtual DbSet<unit_bk> unit_bk { get; set; }
        public virtual DbSet<unit_m> unit_m { get; set; }
        public virtual DbSet<unit_old> unit_old { get; set; }
        public virtual DbSet<unit_tmp> unit_tmp { get; set; }
        public virtual DbSet<unit_view> unit_view { get; set; }
        public virtual DbSet<vw_srv_year> vw_srv_year { get; set; }
        public virtual DbSet<wgroup> wgroup { get; set; }
        public virtual DbSet<wstatus> wstatus { get; set; }
        public virtual DbSet<xxx> xxx { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            SysGlobal.SysFunc.CallEntityPIS(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Thai_CI_AS");

            modelBuilder.Entity<Action>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ActionName)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.ActionType)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.ID)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Name)
                    .HasMaxLength(80)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.NewCostcenter)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.NewLocationID)
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.NewLocationName)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.NewOrgID)
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.NewOrgLongName)
                    .HasMaxLength(160)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.NewOrgShortName)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.NewPositionID)
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.NewPositionName)
                    .HasMaxLength(160)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.OldCostCenter)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.OldLocationID)
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.OldLocationName)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.OldOrgID)
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.OldOrgLongName)
                    .HasMaxLength(160)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.OldOrgShortName)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.OldPositionID)
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.OldPositionName)
                    .HasMaxLength(160)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Reason)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.ReasonForAction)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.StartDate)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<AssignMenu>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BA)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.JOBID)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.MenuCode)
                    .HasMaxLength(5)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Band_Desc>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BAND_CODE)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.BAND_DESC1)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("BAND_DESC");
            });

            modelBuilder.Entity<Belong_To>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.LAST_UPDATE).HasColumnType("datetime");

                entity.Property(e => e.POSCODE)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Business_Area>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BA_Code)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.BA_Description)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<COSTCENTER>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ALLOCCTR).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CCCODE).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CODE).HasColumnType("numeric(18, 0)");
            });

            modelBuilder.Entity<Cost_Center_Secondment>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CCTR)
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.COMCOD)
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.EMPID)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.END).HasColumnType("date");

                entity.Property(e => e.ORGUNIT)
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.OVERSEA)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.PERCENT).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PRIORITY)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.START).HasColumnType("date");
            });

            modelBuilder.Entity<Course_Catalog>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CATABBR)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.CATALOGID)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.ENDDATE).HasColumnType("datetime");

                entity.Property(e => e.STARTDATE).HasColumnType("datetime");
            });

            modelBuilder.Entity<Course_Catalog_1>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CATABBR)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.CATALOGID)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.ENDDATE).HasColumnType("datetime");

                entity.Property(e => e.STARTDATE).HasColumnType("datetime");
            });

            modelBuilder.Entity<Customer_secondment>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Abbriviate)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CUSTOMER)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Comcode)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Company_Code_Name)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("Company Code Name");

                entity.Property(e => e.SEQ)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Startdate).HasColumnType("datetime");

                entity.Property(e => e.enddate).HasColumnType("datetime");

                entity.Property(e => e.unitcode)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<DSC_LOGON>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ACCT_ASSIGN_GR)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ACCT_ASSING_GR_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ADDRESS)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.AREA)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.AREA_BLOCK)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.AREA_BLOCK_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.AREA_CODE)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.BUS_PART_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.BUS_PART_NO)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.BUS_PART_NO_1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CITY_CODE)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CITY_CUST)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CR_CTL_AREA)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CR_CTL_AREA_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CURRENCY)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CURRENCY_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUSTNAME)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUSTOMER_ID)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_CLASS)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_COMP_GR)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_COMP_GR_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_GR)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_GR1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_GR1_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_GR2)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_GR2_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_GR3)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_GR3_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_GR4)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_GR4_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_GR5)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_GR5_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_GR_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_NAME1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_NAME2)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_NAME3)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_NAME4)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CUST_NUMBER)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DATE_CHANGED)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DATE_CREATED)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DELIVER_PLANT)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DELIVER_PLANT_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DIST_CHANNEL)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DIST_CHANNEL_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DIVISION)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DIVISION_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EXCRATE_TYPE)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EXCRATE_TYPE_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.GSP_CONTRACT_DATE)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.GSP_CONTRACT_NO)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.GSP_PRICING_INFO1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.GSP_PRICING_INFO2)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.HANDLING_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.HANDLING_TYPE)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.INCOTERMS1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.INCOTERMS1_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.INCOTERMS2)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.MODE_TRANS)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.MODE_TRANS_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NAME_CHANGED)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NAME_CREATED)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NGR_CONTRACT_COGEN)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NGR_CONTRACT_DCQ1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NGR_CONTRACT_DCQ2)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NGR_CONTRACT_IND)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NGR_GAS_START_DATE1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NGR_GAS_START_DATE2)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NGV_CONTRACT_BMTA)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NGV_CONTRACT_DCQ3)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NGV_GAS_START_DATE3)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PAYM_GUAR_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PAYM_GUAR_PROC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PE_SALES_GR)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PE_SALES_GR_1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PE_SALES_GR_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PE_SALES_GR_DESC_1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PE_SALES_OFF)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PE_SALES_OFF_1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PE_SALES_OFF_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PE_SALES_OFF_DESC_1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PE_SEARCH_TERM)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PE_SEARCH_TERM3)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PRICE_GR)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PRICE_GR_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PRICING_PROC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PRICING_PROC_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.REBATE)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SALES_DISTRICT)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SALES_DISTRICT_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SALES_GR)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SALES_GR_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SALES_OFFICE)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SALES_ORG)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SALES_ORG_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SECTOR)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SECTOR_CODE)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SELES_OFFICE_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SHIPPING_COND)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SHIPPING_COND_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TAX_CLASS)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TAX_CLASS_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TEL_NO)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TERMS_PAYMENT_DESC)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TERMS_PAYMENT_KEY)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<EDUCATE>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.code)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.country)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.degcode)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.edu_no)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.edu_year)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.edugrpcode)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.instname)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.majorcode)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.mjgrpcode)
                    .HasMaxLength(3)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<EMP_VIP>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.EMP_ID)
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<EVENT>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.EVENTCODE).HasColumnType("numeric(8, 0)");

                entity.Property(e => e.EVENTNAME)
                    .HasMaxLength(60)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Employee_data>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("Employee_data");

                entity.Property(e => e.BUSINESS_UNIT_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.BUSINESS_UNIT_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.CostCenter)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.EmailAddr)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Emp_Name)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.Emp_name_Eng)
                    .HasMaxLength(72)
                    .IsUnicode(false);

                entity.Property(e => e.POSCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.POSNAME)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.UNIT_LEVEL_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.UNIT_LEVEL_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.unitabbr)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.unitname)
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<GC_PIS>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("GC-PIS");

                entity.Property(e => e.ApprovalCheck).IsUnicode(false);

                entity.Property(e => e.BIRTHDATE).IsUnicode(false);

                entity.Property(e => e.COSTCENTER).IsUnicode(false);

                entity.Property(e => e.Category).IsUnicode(false);

                entity.Property(e => e.CompCode).IsUnicode(false);

                entity.Property(e => e.Contract).IsUnicode(false);

                entity.Property(e => e.DEPARTMENT).IsUnicode(false);

                entity.Property(e => e.DIVISION).IsUnicode(false);

                entity.Property(e => e.EMAIL).IsUnicode(false);

                entity.Property(e => e.EMPGROUP).IsUnicode(false);

                entity.Property(e => e.EMPLOYEEID).IsUnicode(false);

                entity.Property(e => e.EMPSUBGROUP).IsUnicode(false);

                entity.Property(e => e.ENFIRSTNAME).IsUnicode(false);

                entity.Property(e => e.ENLASTNAME).IsUnicode(false);

                entity.Property(e => e.ENName).IsUnicode(false);

                entity.Property(e => e.ENTITLE).IsUnicode(false);

                entity.Property(e => e.GENDER).IsUnicode(false);

                entity.Property(e => e.HIREDATE).IsUnicode(false);

                entity.Property(e => e.HOLDERPOSITION).IsUnicode(false);

                entity.Property(e => e.IDENTITYID).IsUnicode(false);

                entity.Property(e => e.INTERNALPHONE).IsUnicode(false);

                entity.Property(e => e.Indicator).IsUnicode(false);

                entity.Property(e => e.MANAGERIAL).IsUnicode(false);

                entity.Property(e => e.MOBILE).IsUnicode(false);

                entity.Property(e => e.OBJABBR).IsUnicode(false);

                entity.Property(e => e.OBJNAME).IsUnicode(false);

                entity.Property(e => e.ORGID).IsUnicode(false);

                entity.Property(e => e.ObjENName).IsUnicode(false);

                entity.Property(e => e.ObjTHName).IsUnicode(false);

                entity.Property(e => e.OrgLevel).IsUnicode(false);

                entity.Property(e => e.PERSUBAREA).IsUnicode(false);

                entity.Property(e => e.POSID).IsUnicode(false);

                entity.Property(e => e.PerArea).IsUnicode(false);

                entity.Property(e => e.PosAbbr).IsUnicode(false);

                entity.Property(e => e.PosENName).IsUnicode(false);

                entity.Property(e => e.PosName).IsUnicode(false);

                entity.Property(e => e.PosTHName).IsUnicode(false);

                entity.Property(e => e.REFERENCEID).IsUnicode(false);

                entity.Property(e => e.RETIREMENTDATE).IsUnicode(false);

                entity.Property(e => e.ReportToEmail).IsUnicode(false);

                entity.Property(e => e.ReportToPerson).IsUnicode(false);

                entity.Property(e => e.ReportToPosID).IsUnicode(false);

                entity.Property(e => e.SUPERVISOR).IsUnicode(false);

                entity.Property(e => e.Section).IsUnicode(false);

                entity.Property(e => e.THFIRSTNAME).IsUnicode(false);

                entity.Property(e => e.THLASTNAME).IsUnicode(false);

                entity.Property(e => e.THNAME).IsUnicode(false);

                entity.Property(e => e.THTITLE).IsUnicode(false);

                entity.Property(e => e.USERID).IsUnicode(false);

                entity.Property(e => e.Unit).IsUnicode(false);
            });

            modelBuilder.Entity<Global_Logs>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.EXECUTEBYUSER)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EXECUTEDATETIME)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EXECUTEUNDERDOMAIN)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Log_No).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Programname)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SendDateTime)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Icon>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Icon1)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("Icon");
            });

            modelBuilder.Entity<Master_D>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.COURSEABBR)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.COURSEID)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.COURSENAME)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ENDDATE).HasColumnType("datetime");

                entity.Property(e => e.METHODID)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.STARTDATE).HasColumnType("datetime");
            });

            modelBuilder.Entity<Master_E>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ENDDATE).HasColumnType("datetime");

                entity.Property(e => e.INSTRUCTOR)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.ORGANIZER)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.SESSIONABBR)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.SESSIONID)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.SESSIONNAME)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.STARTDATE).HasColumnType("datetime");
            });

            modelBuilder.Entity<MenuMaster>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ExecuteFile)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.MenuCode)
                    .IsRequired()
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.MenuName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.parameter1)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.parameter2)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Menu_Structure>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Menu_Description)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Path)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<NEWS>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.NEWS_CODE)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.NEWS_DATE)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.NEWS_HEADLINE)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NEWS_LINK)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.VALID_UNTIL_DATE)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ORDER>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CREATE_DATE).HasColumnType("datetime");

                entity.Property(e => e.EFFECT_DATE).HasColumnType("datetime");

                entity.Property(e => e.EMP_CODE).HasColumnType("numeric(6, 0)");

                entity.Property(e => e.LEVEL_CODE).HasColumnType("numeric(2, 0)");

                entity.Property(e => e.MAJ_POS_CODE)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.MIN_POS_CODE)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.OLD_LEVEL).HasColumnType("numeric(2, 0)");

                entity.Property(e => e.OLD_MAJ_POS)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.OLD_MIN_POS)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.OLD_UNIT)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.ORDER_NO)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.ORDER_TYPE_CODE)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.UNIT_CODE)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.UPDATE_DATE).HasColumnType("datetime");
            });

            modelBuilder.Entity<ORDERTYP>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ORDER_TYPE_CODE)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.ORDER_TYPE_NAME)
                    .HasMaxLength(80)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PIS_PWD>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.LOGIN_ID)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.PASSWORD)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Person_HI_Info>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.CURE_RIGHT)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.LEVEL_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PER_CODE).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PER_NAME)
                    .HasMaxLength(52)
                    .IsUnicode(false);

                entity.Property(e => e.RELATE_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Person_Info>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.Cure_Right)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Level_No).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Per_Code)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Per_Name)
                    .HasMaxLength(77)
                    .IsUnicode(false);

                entity.Property(e => e.Relate_No).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Person_Info_HI>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.CURE_RIGHT)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.LEVEL_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PER_CODE).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PER_NAME)
                    .HasMaxLength(52)
                    .IsUnicode(false);

                entity.Property(e => e.RELATE_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Person_Info_WF>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.CURE_RIGHT)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.LEVEL_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PER_CODE).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PER_NAME)
                    .HasMaxLength(78)
                    .IsUnicode(false);

                entity.Property(e => e.RELATE_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Person_WF_Info>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.CURE_RIGHT)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.LEVEL_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PER_CODE).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PER_NAME)
                    .HasMaxLength(52)
                    .IsUnicode(false);

                entity.Property(e => e.RELATE_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Person_info_WF_BK>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ADDRESS)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.AGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.AGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.ENTRYDATE).HasColumnType("datetime");

                entity.Property(e => e.EmailAddr)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.HIRINGDATE).HasColumnType("datetime");

                entity.Property(e => e.HOMETEL)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.INAME)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.JGAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JGAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBGROUP)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.MGMT)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.OFFICECODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.OFFICETEL)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.POSAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.POSAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.POSCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.RETIREYEAR)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.STJGDATE).HasColumnType("datetime");

                entity.Property(e => e.STPOSDATE).HasColumnType("datetime");

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.WGRPCODE)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.WSTCODE)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Personal_PDMS>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("Personal_PDMS");

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.EmailAddr)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.OFFICETEL)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Personel_E_signature>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("Personel_E-signature");

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FULLNAME_ENG)
                    .HasMaxLength(73)
                    .IsUnicode(false);

                entity.Property(e => e.FULLNAME_THA)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.Unitname_ENG)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.Unitname_THA)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.posname_ENG)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.posname_Tha)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Personel_HI>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ADDRESS)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.AGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.AGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.ENTRYDATE).HasColumnType("datetime");

                entity.Property(e => e.EmailAddr)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FULLNAMETH)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.HIRINGDATE).HasColumnType("datetime");

                entity.Property(e => e.HOMETEL)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.INAME)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.JGAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JGAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBGROUP)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.MGMT)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.OFFICECODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.OFFICETEL)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.POSAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.POSAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.POSCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.RETIREYEAR)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.STJGDATE).HasColumnType("datetime");

                entity.Property(e => e.STPOSDATE).HasColumnType("datetime");

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.WGRPCODE)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.WSTCODE)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Personel_Relate>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FULLNAMETH)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.INAME)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Level_No).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Rel_FName)
                    .HasMaxLength(51)
                    .IsUnicode(false);

                entity.Property(e => e.Rel_LName)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Relate_No).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Personel_Relate1>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Code).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Fname)
                    .HasMaxLength(51)
                    .IsUnicode(false);

                entity.Property(e => e.LName)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Level_No).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Relate_No).HasColumnType("numeric(18, 0)");
            });

            modelBuilder.Entity<Personel_Relate_HI>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FULLNAMETH)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.INAME)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Level_No).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Rel_FName)
                    .HasMaxLength(51)
                    .IsUnicode(false);

                entity.Property(e => e.Rel_LName)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Relate_No).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Personel_Relate_HI_V2>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FULLNAMETH)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.INAME)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.LEVEL_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.RELATE_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.REL_FNAME)
                    .HasMaxLength(51)
                    .IsUnicode(false);

                entity.Property(e => e.REL_LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Personel_Relate_V2>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.CODE).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Fname)
                    .HasMaxLength(51)
                    .IsUnicode(false);

                entity.Property(e => e.LEVEL_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.RELATE_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Personel_Relate_WF>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FULLNAMETH)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.INAME)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Level_No).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Rel_FName)
                    .HasMaxLength(51)
                    .IsUnicode(false);

                entity.Property(e => e.Rel_LName)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Relate_No).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Personel_WF>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ADDRESS)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.AGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.AGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.ENTRYDATE).HasColumnType("datetime");

                entity.Property(e => e.EmailAddr)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FULLNAMETH)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.HIRINGDATE).HasColumnType("datetime");

                entity.Property(e => e.HOMETEL)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.INAME)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.JGAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JGAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBGROUP)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.MGMT)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.OFFICECODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.OFFICETEL)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.POSAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.POSAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.POSCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.RETIREYEAR)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.STJGDATE).HasColumnType("datetime");

                entity.Property(e => e.STPOSDATE).HasColumnType("datetime");

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.WGRPCODE)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.WSTCODE)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Personel_WP>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("Personel_WP");

                entity.Property(e => e.Address)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.CODE)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Department)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.EmailAddr)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Engname)
                    .HasMaxLength(72)
                    .IsUnicode(false);

                entity.Property(e => e.FULLNAMETH)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.Management_ID)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.PERCENTAGE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.mobile)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.unitabbr)
                    .HasMaxLength(12)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<RELATE>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.CURE_RIGHT)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.EDU_RIGHT)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.EMP_CODE).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.FNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.LEVEL_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.RELATE_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.STATUS)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.TITLE)
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Relate_HI>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.EMP_CODE).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Emp_Name)
                    .HasMaxLength(77)
                    .IsUnicode(false);

                entity.Property(e => e.LEVEL_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RELATE_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.STATUS)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<Relate_WF>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.EMP_CODE).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Emp_Name)
                    .HasMaxLength(77)
                    .IsUnicode(false);

                entity.Property(e => e.LEVEL_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RELATE_NO).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.STATUS)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<Relationship_Course_N_Catalog>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CATALOGID)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.COURSEID)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.ENDDATE).HasColumnType("datetime");

                entity.Property(e => e.STARTDATE).HasColumnType("datetime");
            });

            modelBuilder.Entity<Relationship_Course_N_SESSION>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CATALOGID)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.ENDDATE).HasColumnType("datetime");

                entity.Property(e => e.SESSIONID)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.STARTDATE).HasColumnType("datetime");
            });

            modelBuilder.Entity<Report_To>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BAND)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.CODE)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.JOBGROUP)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.LAST_UPDATE).HasColumnType("datetime");

                entity.Property(e => e.PERCENTAGE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.POSCODE)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.REP_BAND)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.REP_CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.REP_JOBGROUP)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.REP_MGMT)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.REP_POSCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TRAIN>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CREATE_DATE).HasColumnType("datetime");

                entity.Property(e => e.EDIT_DATE).HasColumnType("datetime");

                entity.Property(e => e.EMP_CODE).HasColumnType("numeric(6, 0)");

                entity.Property(e => e.END_DATE).HasColumnType("datetime");

                entity.Property(e => e.F_LEVEL).HasColumnType("numeric(2, 0)");

                entity.Property(e => e.ST_DATE).HasColumnType("datetime");

                entity.Property(e => e.TRAIN_CODE).HasColumnType("numeric(8, 0)");
            });

            modelBuilder.Entity<UNIT_PDMS>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("UNIT_PDMS");

                entity.Property(e => e.engname)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.longname)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.unitabbr)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.unitcode)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<USER_COOI>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("USER_COOI");

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Remark)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.UserID)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<VW_PERSONAL>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ApprovalCheck)
                    .HasMaxLength(7)
                    .IsUnicode(false);

                entity.Property(e => e.COSTCENTER)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Category)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CompCode)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.Contract)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DEPARTMENT)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.DIVISION)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.EMAIL)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EMPGROUP)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.EMPLOYEEID)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.EMPSUBGROUP)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.ENFIRSTNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.ENLASTNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.ENName)
                    .HasMaxLength(51)
                    .IsUnicode(false);

                entity.Property(e => e.ENTITLE)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.GENDER)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.HIREDATE).HasColumnType("datetime");

                entity.Property(e => e.HOLDERPOSITION)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.INTERNALPHONE)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.Indicator)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.MANAGERIAL)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.MOBILE)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.OBJABBR)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.OBJNAME)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.ORGID)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.ObjENName)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.ObjTHName)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.OrgLevel)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PERSUBAREA)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.POSID)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.PerArea)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.PosAbbr)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.PosENName)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.PosName)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.PosTHName)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.REFERENCEID)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ReportToEmail)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ReportToPerson)
                    .HasMaxLength(70)
                    .IsUnicode(false);

                entity.Property(e => e.ReportToPosID)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SUPERVISOR)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Section)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.THFIRSTNAME)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.THLASTNAME)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.THNAME)
                    .HasMaxLength(70)
                    .IsUnicode(false);

                entity.Property(e => e.THTITLE)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.USERID)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Unit)
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VW_Staff_Info>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("VW_Staff_Info");

                entity.Property(e => e.BUSINESS_UNIT_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.EmailAddr)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Emp_Name)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.FULLNAMETH)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.JOBGROUP)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.MGMT)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.POSCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.POSNAME)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.WSTCODE)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.unitname)
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<View2>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("View2");

                entity.Property(e => e.wstcode)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.wstname)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<WAREA>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.WAREACODE)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.WAREANAME)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<additional_data>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BLOOD_GROUP)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.CODE)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.LAST_UPDATE).HasColumnType("datetime");

                entity.Property(e => e.SHIRT_SIZE)
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<assign_link>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.active).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.authority).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.auto_code).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.link_type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.pttgroup_id).HasColumnType("decimal(18, 0)");
            });

            modelBuilder.Entity<authority>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.auto_code).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.code)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.for_bu)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.from_bu)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.name)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.until).HasColumnType("datetime");
            });

            modelBuilder.Entity<card_info>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.card_id).HasColumnType("decimal(4, 0)");

                entity.Property(e => e.card_name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.em_recv)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.em_sender)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.melody_no)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.sender)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.text_att).HasColumnType("text");
            });

            modelBuilder.Entity<card_info1>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.card_id).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.card_name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.em_reev)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.em_sender)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.melody_no)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.sender)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.text_att).HasColumnType("text");
            });

            modelBuilder.Entity<degree>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.degcode)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.degname)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<directory_info>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.call_sign)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.code)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.direct)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.fax)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.homephone)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.intphone)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.location_id).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.mobile)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.nickname)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.pager)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.responsibility)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.tname)
                    .HasMaxLength(60)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<dtproperties>(entity =>
            {
                entity.HasKey(e => new { e.id, e.property })
                    .HasName("pk_dtproperties");

                entity.Property(e => e.id).ValueGeneratedOnAdd();

                entity.Property(e => e.property)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.lvalue).HasColumnType("image");

                entity.Property(e => e.uvalue).HasMaxLength(255);

                entity.Property(e => e.value)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<edugroup>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.edugrpcode)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.edugrpname)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<grplevel>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Name)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<hr_manage>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.hr_no).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.unitcode)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<hr_section>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.auto_no).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.code)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.create_date).HasColumnType("datetime");

                entity.Property(e => e.note)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.subhrof)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<l_log>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.assign_auto_code)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.l_last_update).HasColumnType("datetime");

                entity.Property(e => e.l_log_by)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.l_log_date).HasColumnType("datetime");

                entity.Property(e => e.l_log_id).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.l_log_unit)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.pis_auto_code)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<location>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.floor)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.location_id).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.location_name)
                    .HasMaxLength(60)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<log_action>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.action)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.auto_code).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.code)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.log_by)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.log_date).HasColumnType("datetime");

                entity.Property(e => e.note)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.system).HasColumnType("decimal(18, 0)");
            });

            modelBuilder.Entity<major>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.majorcode)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.majorname)
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<member_pttgroup>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.auto_code).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.member_date).HasColumnType("datetime");

                entity.Property(e => e.member_id).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.pttcode)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.pttgroup_id).HasColumnType("decimal(18, 0)");
            });

            modelBuilder.Entity<mjgroup>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.mjgrpcode)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.mjgrpname)
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<password>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.code)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.pwd)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.pwdexpire).HasColumnType("datetime");

                entity.Property(e => e.pwdstart).HasColumnType("datetime");

                entity.Property(e => e.worktime)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<personel_info>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ADDRESS)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.AGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.AGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.ASSIGNDATE).HasColumnType("datetime");

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.ENTRYDATE).HasColumnType("datetime");

                entity.Property(e => e.EmailAddr)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FULLNAMETH)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.HIRINGDATE).HasColumnType("datetime");

                entity.Property(e => e.HOMETEL)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.INAME)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.INAME1)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.INAME2)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.INAME3)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.INAME4)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.INAME5)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.INAME_ENG)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.JGAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JGAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBGROUP)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME2)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.MGMT)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.MNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.OFFICECODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.OFFICETEL)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.PERSCODE)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.POSAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.POSAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.POSCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.POSNAME)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.QUADRANT).HasColumnType("numeric(2, 0)");

                entity.Property(e => e.RETIREDATE).HasColumnType("datetime");

                entity.Property(e => e.RETIREYEAR)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.SALCODE).HasColumnType("numeric(8, 0)");

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.STJGDATE).HasColumnType("datetime");

                entity.Property(e => e.STPOSDATE).HasColumnType("datetime");

                entity.Property(e => e.Secondment_ID)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.Secondment_text)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.TAXCODE)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.TIMEST)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.WGRPCODE)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.WSTCODE)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.mobile)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<personel_info_Bk>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ADDRESS)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.AGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.AGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.C_MGMT)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ENTRYDATE).HasColumnType("datetime");

                entity.Property(e => e.EmailAddr)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.HOMETEL)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.Hiringdate).HasColumnType("datetime");

                entity.Property(e => e.INAME)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.JGAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JGAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBGROUP)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Lastupdate).HasColumnType("datetime");

                entity.Property(e => e.MGMT)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.OFFICECODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.OFFICETEL)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.POSAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.POSAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.POSCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.RETIREYEAR)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.STJGDATE).HasColumnType("datetime");

                entity.Property(e => e.STPOSDATE).HasColumnType("datetime");

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateBy).HasColumnType("text");

                entity.Property(e => e.V_MGMT)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.V_UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.WGRPCODE)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.WSTCODE)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<personel_info_view>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ADDRESS)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.AGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.AGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.BIRTHDATE).HasColumnType("datetime");

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.ENTRYDATE).HasColumnType("datetime");

                entity.Property(e => e.EmailAddr)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.FULLNAMETH)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.HOMETEL)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.INAME)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.JGAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JGAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JOBAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.LNAME_ENG)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.OFFICECODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.OFFICETEL)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.POSAGE1)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.POSAGE2)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.POSCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.RETIREYEAR)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.SEX)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.STJGDATE).HasColumnType("datetime");

                entity.Property(e => e.STPOSDATE).HasColumnType("datetime");

                entity.Property(e => e.UNITCODE)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.WSTCODE)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<pis_assign>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.authority).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.auto_code).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.code)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.def)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.record_type)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.role_no).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.starting).HasColumnType("datetime");

                entity.Property(e => e.status)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.system).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.timing).HasColumnType("datetime");

                entity.Property(e => e.under).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.unitcode)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<position>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.AB_NAME)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.C_OBJID)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.C_TEXT)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.E_REPORT)
                    .HasMaxLength(400)
                    .IsUnicode(false);

                entity.Property(e => e.Pos_Type)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.Pos_TypeText)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.T_REPORT)
                    .HasMaxLength(400)
                    .IsUnicode(false);

                entity.Property(e => e.e_name)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.poscode)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.posname)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.status)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.t_name)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<position_view>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.AB_NAME)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.E_REPORT)
                    .HasMaxLength(400)
                    .IsUnicode(false);

                entity.Property(e => e.T_REPORT)
                    .HasMaxLength(400)
                    .IsUnicode(false);

                entity.Property(e => e.e_name)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.poscode)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.posname)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.status)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.t_name)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<program>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.prog_desc)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.prog_name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.prog_no).HasColumnType("decimal(18, 0)");
            });

            modelBuilder.Entity<pttgroup>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.pttgroup_date).HasColumnType("datetime");

                entity.Property(e => e.pttgroup_desc)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.pttgroup_id).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.pttgroup_last_update).HasColumnType("datetime");

                entity.Property(e => e.pttgroup_name)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.pttgroup_unit)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<pttgroup_log>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.action)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.action_by)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.log_date).HasColumnType("datetime");

                entity.Property(e => e.log_id).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.note)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.pttgroup_id).HasColumnType("decimal(18, 0)");
            });

            modelBuilder.Entity<role>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.role_abbr)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.role_name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.role_no).HasColumnType("decimal(18, 0)");
            });

            modelBuilder.Entity<tbDepartment>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Dept_Code)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Dept_Name)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.Sub_Unit)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<tbDepartment_bk>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Dept_Code)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Dept_Name)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.Sub_Unit)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<tbUnit>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Sub_Unit)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Unit_Code)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Unit_Name)
                    .HasMaxLength(80)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<tbUnit1>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BU)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.Dept_Code)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Dept_Name)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.Unit_Code)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Unit_Name)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.longname)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.unitabbr)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.unitcode)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.unitname)
                    .HasMaxLength(80)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<tbUnit1_BK>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BU)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.Dept_Code)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Dept_Name)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.Unit_Code)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Unit_Name)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.longname)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.unitabbr)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.unitcode)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.unitname)
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<tbUnit_BK>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Sub_Unit)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Unit_Code)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Unit_Name)
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<unit>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BUSINESS_UNIT_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.BUSINESS_UNIT_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.CostCenter)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.DUMMY_RELATIONSHIP)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.HEAD_CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.HEAD_POSITION)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Lastupdate).HasColumnType("datetime");

                entity.Property(e => e.PROJECT_LEVEL_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.PROJECT_LEVEL_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.REMARK)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UNIT_LEVEL_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.UNIT_LEVEL_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.engname)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.longname)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.unitabbr)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.unitcode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.unitname)
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<unit_20150207>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BUSINESS_UNIT_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.BUSINESS_UNIT_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.CostCenter)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.DUMMY_RELATIONSHIP)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.Lastupdate).HasColumnType("datetime");

                entity.Property(e => e.PROJECT_LEVEL_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.PROJECT_LEVEL_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.REMARK)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UNIT_LEVEL_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.UNIT_LEVEL_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.engname)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.longname)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.unitabbr)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.unitcode)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.unitname)
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<unit_WP>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("unit_WP");

                entity.Property(e => e.DUMMY_RELATIONSHIP)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.UNIT_LEVEL_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.UNIT_LEVEL_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.unitabbr)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.unitcode)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<unit_bk>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BUSINESS_UNIT_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.BUSINESS_UNIT_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.CostCenter)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.DUMMY_RELATIONSHIP)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.Lastupdate).HasColumnType("datetime");

                entity.Property(e => e.REMARK)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UNIT_LEVEL_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.UNIT_LEVEL_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.engname)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.longname)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.unitabbr)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.unitcode)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.unitname)
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<unit_m>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.engname)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.longname)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.unitcode)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<unit_old>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Lastupdate).HasColumnType("datetime");

                entity.Property(e => e.engname)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.longname)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.unitabbr)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.unitcode)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.unitname)
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<unit_tmp>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.EMAILADDr)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.unitcode)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<unit_view>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("unit_view");

                entity.Property(e => e.BUSINESS_UNIT_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.BUSINESS_UNIT_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.CostCenter)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.DUMMY_RELATIONSHIP)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.HEAD_CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.HEAD_POSITION)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Lastupdate).HasColumnType("datetime");

                entity.Property(e => e.PROJECT_LEVEL_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.PROJECT_LEVEL_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.REMARK)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UNIT_LEVEL_ID)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.UNIT_LEVEL_NAME)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.engname)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.longname)
                    .HasMaxLength(160)
                    .IsUnicode(false);

                entity.Property(e => e.unitabbr)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.unitcode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.unitname)
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<vw_srv_year>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vw_srv_year");

                entity.Property(e => e.CODE)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.time_spent_company)
                    .HasMaxLength(16)
                    .IsUnicode(false);

                entity.Property(e => e.time_spent_job)
                    .HasMaxLength(16)
                    .IsUnicode(false);

                entity.Property(e => e.time_spent_pos)
                    .HasMaxLength(16)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<wgroup>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.WAREACODE)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.WGRPCODE)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.WGRPNAME)
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<wstatus>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.wstcode)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.wstname)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<xxx>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.x)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
