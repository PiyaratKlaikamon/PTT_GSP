using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class PTTGSP_DWSContext : DbContext
    {
        public PTTGSP_DWSContext()
        {
        }

        public PTTGSP_DWSContext(DbContextOptions<PTTGSP_DWSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TB_Goods_Receive> TB_Goods_Receive { get; set; }
        public virtual DbSet<TB_Goods_Receive_Material> TB_Goods_Receive_Material { get; set; }
        public virtual DbSet<TB_Material_Category> TB_Material_Category { get; set; }
        public virtual DbSet<TB_Material_Group> TB_Material_Group { get; set; }
        public virtual DbSet<TB_Material_Location> TB_Material_Location { get; set; }
        public virtual DbSet<TB_Material_Unit> TB_Material_Unit { get; set; }
        public virtual DbSet<TB_Materials> TB_Materials { get; set; }
        public virtual DbSet<TB_Materials_BP> TB_Materials_BP { get; set; }
        public virtual DbSet<TB_Materials_File> TB_Materials_File { get; set; }
        public virtual DbSet<TB_Reason> TB_Reason { get; set; }
        public virtual DbSet<TB_Stock_Update> TB_Stock_Update { get; set; }
        public virtual DbSet<TB_Stock_Update_Approval> TB_Stock_Update_Approval { get; set; }
        public virtual DbSet<TB_Stock_Update_Material> TB_Stock_Update_Material { get; set; }
        public virtual DbSet<TB_User> TB_User { get; set; }
        public virtual DbSet<TB_Vendor> TB_Vendor { get; set; }
        public virtual DbSet<TB_Work> TB_Work { get; set; }
        public virtual DbSet<TB_Work_Material> TB_Work_Material { get; set; }
        public virtual DbSet<TM_Config> TM_Config { get; set; }
        public virtual DbSet<TM_Menu> TM_Menu { get; set; }
        public virtual DbSet<TM_Option> TM_Option { get; set; }
        public virtual DbSet<TM_Option_Sub> TM_Option_Sub { get; set; }
        public virtual DbSet<TM_Permission> TM_Permission { get; set; }
        public virtual DbSet<TM_Step_Request> TM_Step_Request { get; set; }
        public virtual DbSet<TM_Step_Stock_Update> TM_Step_Stock_Update { get; set; }
        public virtual DbSet<T_Log> T_Log { get; set; }
        public virtual DbSet<T_Log_Email> T_Log_Email { get; set; }
        public virtual DbSet<T_Log_Error> T_Log_Error { get; set; }
        public virtual DbSet<T_Request> T_Request { get; set; }
        public virtual DbSet<T_Request_Approval> T_Request_Approval { get; set; }
        public virtual DbSet<T_Request_Material> T_Request_Material { get; set; }
        public virtual DbSet<V_Material_Category> V_Material_Category { get; set; }
        public virtual DbSet<V_Materials> V_Materials { get; set; }
        public virtual DbSet<V_Stock_Update> V_Stock_Update { get; set; }
        public virtual DbSet<V_User> V_User { get; set; }
        public virtual DbSet<V_Withdrawal_Status> V_Withdrawal_Status { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                SysGlobal.SysFunc.CallEntity(optionsBuilder);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Thai_CI_AS");

            modelBuilder.Entity<TB_Goods_Receive>(entity =>
            {
                entity.HasKey(e => e.nRequestID)
                    .HasName("PK_TB_Goods_Receive_1");

                entity.Property(e => e.nRequestID)
                    .ValueGeneratedNever()
                    .HasComment("รหัสรายการทำรับวัสดุ (Goods Receive)");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ");

                entity.Property(e => e.dDocDate)
                    .HasColumnType("date")
                    .HasComment("วันที่เอกสาร");

                entity.Property(e => e.dReceiveDate)
                    .HasColumnType("date")
                    .HasComment("วันที่รับวัสดุ");

                entity.Property(e => e.dUpdate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ปรับปรุงรายการ");

                entity.Property(e => e.nSourceID).HasComment("รหัสแหล่งที่มาของวัสดุ TM_Option nID = 4");

                entity.Property(e => e.nTotalPrice)
                    .HasColumnType("decimal(18, 2)")
                    .HasComment("มูลค่าวัสดุรวม");

                entity.Property(e => e.nVendorID).HasComment("รหัสผู้ขาย");

                entity.Property(e => e.sCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้สร้างรายการ");

                entity.Property(e => e.sFile_Name)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อไฟล์แนบ");

                entity.Property(e => e.sFile_Path)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ที่อยู่ไฟล์แนบ");

                entity.Property(e => e.sFile_SysName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อไฟล์แนบจากระบบ");

                entity.Property(e => e.sNote)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("หมายเหตุ");

                entity.Property(e => e.sRefNo)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasComment("เลขที่อ้างอิง (Reference No.)");

                entity.Property(e => e.sRequestNo)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasComment("เลขที่ใบรับวัสดุ");

                entity.Property(e => e.sUpdateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("สร้างผู้ปรับปรุงรายการ");
            });

            modelBuilder.Entity<TB_Goods_Receive_Material>(entity =>
            {
                entity.HasKey(e => new { e.nRequestID, e.nMaterialID });

                entity.Property(e => e.nRequestID).HasComment("รหัสรายการทำรับวัสดุ (Goods Receive)");

                entity.Property(e => e.nMaterialID).HasComment("รหัสวัสดุในระบบ");

                entity.Property(e => e.nAmount).HasComment("จำนวน");

                entity.Property(e => e.nPrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasComment("ราคาวัสดุต่อชิ้น");

                entity.Property(e => e.nTotalPrice)
                    .HasColumnType("decimal(18, 2)")
                    .HasComment("มูลค่าวัสดุรวม");
            });

            modelBuilder.Entity<TB_Material_Category>(entity =>
            {
                entity.HasKey(e => e.nCategoryID);

                entity.Property(e => e.nCategoryID).HasComment("รหัสประเภทวัสดุในระบบ");

                entity.Property(e => e.IsActive).HasComment("สถานะ 1 = ใช้งาน, 0 ไม่ใช้งาน");

                entity.Property(e => e.IsDel).HasComment("สถานะการลบ 1 = ลบ, 0 ไม่ลบ");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ");

                entity.Property(e => e.dUpdate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ปรับปรุงรายการ");

                entity.Property(e => e.nGroupID).HasComment("รหัสกลุ่มวัสดุ");

                entity.Property(e => e.nOrder).HasComment("ลำดับการแสดงผล");

                entity.Property(e => e.sCategoryCode)
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .HasComment("รหัสประเภทวัสดุ");

                entity.Property(e => e.sCreateBy).HasComment("รหัสผู้สร้างรายการ");

                entity.Property(e => e.sDetail)
                    .HasMaxLength(2500)
                    .IsUnicode(false)
                    .HasComment("รายละเอียด");

                entity.Property(e => e.sName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("ชื่อประเภทวัสดุ");

                entity.Property(e => e.sUpdateBy).HasComment("สร้างผู้ปรับปรุงรายการ");
            });

            modelBuilder.Entity<TB_Material_Group>(entity =>
            {
                entity.HasKey(e => e.nGroupID);

                entity.Property(e => e.nGroupID).HasComment("รหัสกลุ่มวัสดุ");

                entity.Property(e => e.IsActive).HasComment("สถานะ 1 = ใช้งาน, 0 ไม่ใช้งาน");

                entity.Property(e => e.IsDel).HasComment("สถานะการลบ 1 = ลบ, 0 ไม่ลบ");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ");

                entity.Property(e => e.dUpdate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ปรับปรุงรายการ");

                entity.Property(e => e.nOrder).HasComment("ลำดับการแสดงผล");

                entity.Property(e => e.sCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้สร้างรายการ");

                entity.Property(e => e.sDetail)
                    .HasMaxLength(2500)
                    .IsUnicode(false)
                    .HasComment("รายละเอียด");

                entity.Property(e => e.sName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("ชื่อกลุ่มวัสดุ");

                entity.Property(e => e.sUpdateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("สร้างผู้ปรับปรุงรายการ");
            });

            modelBuilder.Entity<TB_Material_Location>(entity =>
            {
                entity.HasKey(e => e.nLocationID);

                entity.Property(e => e.nLocationID).HasComment("รหัสสถานที่เก็บวัสดุ");

                entity.Property(e => e.IsActive).HasComment("สถานะ 1 = ใช้งาน, 0 ไม่ใช้งาน");

                entity.Property(e => e.IsDel).HasComment("สถานะการลบ 1 = ลบ, 0 ไม่ลบ");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ");

                entity.Property(e => e.dUpdate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ปรับปรุงรายการ");

                entity.Property(e => e.sCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้สร้างรายการ");

                entity.Property(e => e.sDetail)
                    .HasMaxLength(2500)
                    .IsUnicode(false)
                    .HasComment("รายละเอียด");

                entity.Property(e => e.sName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อสถานที่เก็บวัสดุ");

                entity.Property(e => e.sUpdateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("สร้างผู้ปรับปรุงรายการ");
            });

            modelBuilder.Entity<TB_Material_Unit>(entity =>
            {
                entity.HasKey(e => e.nUnitID);

                entity.Property(e => e.nUnitID).HasComment("รหัสหน่วยนับวัสดุ");

                entity.Property(e => e.IsActive).HasComment("สถานะ 1 = ใช้งาน, 0 ไม่ใช้งาน");

                entity.Property(e => e.IsDel).HasComment("สถานะการลบ 1 = ลบ, 0 ไม่ลบ");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ");

                entity.Property(e => e.dUpdate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ปรับปรุงรายการ");

                entity.Property(e => e.sCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้สร้างรายการ");

                entity.Property(e => e.sDetail)
                    .HasMaxLength(2500)
                    .IsUnicode(false)
                    .HasComment("รายละเอียด");

                entity.Property(e => e.sName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("ชื่อหน่วยนับ");

                entity.Property(e => e.sUpdateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("สร้างผู้ปรับปรุงรายการ");
            });

            modelBuilder.Entity<TB_Materials>(entity =>
            {
                entity.HasKey(e => e.nMaterialID)
                    .HasName("PK_TB_Material");

                entity.Property(e => e.nMaterialID).HasComment("รหัสวัสดุในระบบ");

                entity.Property(e => e.IsActive).HasComment("สถานะ 1 = ใช้งาน, 0 ไม่ใช้งาน");

                entity.Property(e => e.IsDel).HasComment("สถานะการลบ 1 = ลบ, 0 ไม่ลบ");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ");

                entity.Property(e => e.dUpdate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ปรับปรุงรายการ");

                entity.Property(e => e.nCategoryID).HasComment("รหัสประเภทวัสดุ");

                entity.Property(e => e.nDuplicateDay).HasComment("จำนวนการเบิกซ้ำ (วัน)");

                entity.Property(e => e.nGroupID).HasComment("รหัสกลุ่มวัสดุ");

                entity.Property(e => e.nLocationID).HasComment("รหัสสถานที่เก็บวัสดุ");

                entity.Property(e => e.nMax).HasComment("Maximum Stock");

                entity.Property(e => e.nMaxReserve).HasComment("กำหนดจำนวนการเบิก");

                entity.Property(e => e.nMin).HasComment("Minimum Stock");

                entity.Property(e => e.nPrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasComment("ราคาวัสดุต่อชิ้น");

                entity.Property(e => e.nReOrderPoint).HasComment("Re-Order Point");

                entity.Property(e => e.nUnitID).HasComment("รหัสหน่วยนับวัสดุ");

                entity.Property(e => e.sBinLocation)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasComment("ชั้นเก็บวัสดุ (Bin Location)");

                entity.Property(e => e.sCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้สร้างรายการ");

                entity.Property(e => e.sDetail)
                    .HasMaxLength(2500)
                    .IsUnicode(false)
                    .HasComment("รายละเอียดเพิ่มเติม");

                entity.Property(e => e.sDetail_Material)
                    .HasMaxLength(2500)
                    .IsUnicode(false)
                    .HasComment("รายละเอียดวัสดุ (ยี่ห้อ/รุ่น/ขนาด)");

                entity.Property(e => e.sFile_Name)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อไฟล์ภาพหน้าปก");

                entity.Property(e => e.sFile_Path)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ที่อยู่ไฟล์ภาพหน้าปก");

                entity.Property(e => e.sFile_SysName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อไฟล์ภาพหน้าปกจากระบบ");

                entity.Property(e => e.sMaterialCode)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสวัสดุที่แสดงในระบบ");

                entity.Property(e => e.sName)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasComment("ชื่อวัสดุ");

                entity.Property(e => e.sUpdateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("สร้างผู้ปรับปรุงรายการ");
            });

            modelBuilder.Entity<TB_Materials_BP>(entity =>
            {
                entity.HasKey(e => e.nMaterialID);

                entity.Property(e => e.nMaterialID)
                    .ValueGeneratedNever()
                    .HasComment("รหัสวัสดุในระบบ");

                entity.Property(e => e.nMat_BP).HasComment("จำนวนวัสดุคงเหลือ - จำนวนวัสดุรอดำเนินการ");

                entity.Property(e => e.nMat_Balance).HasComment("จำนวนวัสดุคงเหลือ");

                entity.Property(e => e.nMat_Pending).HasComment("จำนวนวัสดุรอดำเนินการ");
            });

            modelBuilder.Entity<TB_Materials_File>(entity =>
            {
                entity.HasKey(e => new { e.nMaterialID, e.nItem })
                    .HasName("PK_TB_Material_File");

                entity.Property(e => e.nMaterialID).HasComment("รหัสวัสดุในระบบ");

                entity.Property(e => e.nItem).HasComment("รหัสไฟล์");

                entity.Property(e => e.sFile_Name)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อไฟล์");

                entity.Property(e => e.sFile_Path)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ที่อยู่ไฟล์");

                entity.Property(e => e.sFile_SysName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อไฟล์จากระบบ");
            });

            modelBuilder.Entity<TB_Reason>(entity =>
            {
                entity.HasKey(e => e.nReasonID);

                entity.Property(e => e.nReasonID).HasComment("รหัสเหตุผลในการเบิก");

                entity.Property(e => e.IsActive).HasComment("สถานะ 1 = ใช้งาน, 0 ไม่ใช้งาน");

                entity.Property(e => e.IsDel).HasComment("สถานะการลบ 1 = ลบ, 0 ไม่ลบ");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ");

                entity.Property(e => e.dUpdate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ปรับปรุงรายการ");

                entity.Property(e => e.sCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้สร้างรายการ");

                entity.Property(e => e.sDetail)
                    .HasMaxLength(2500)
                    .IsUnicode(false)
                    .HasComment("รายละเอียด");

                entity.Property(e => e.sName)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasComment("เหตุผลในการเบิก");

                entity.Property(e => e.sUpdateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("สร้างผู้ปรับปรุงรายการ");
            });

            modelBuilder.Entity<TB_Stock_Update>(entity =>
            {
                entity.HasKey(e => e.nRequestID)
                    .HasName("PK_TB_Update_Stock");

                entity.Property(e => e.nRequestID).HasComment("รหัสรายการขอปรับปรุง Stock");

                entity.Property(e => e.IsRevisit).HasComment("ส่งกลับแก้ไข 1 = ใช่, 0 = ไม่ใช่");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ");

                entity.Property(e => e.dUpdate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ปรับปรุงรายการ");

                entity.Property(e => e.dUpdateStockDate)
                    .HasColumnType("date")
                    .HasComment("วันที่ปรับปรุง Stock");

                entity.Property(e => e.nStepID).HasComment("รหัสสถานะรายการจากตาราง TM_Step_Stock_Update");

                entity.Property(e => e.nTotalPrice_Minus)
                    .HasColumnType("decimal(18, 2)")
                    .HasComment("มูลค่าวัสดุรวม (ติดลบ)");

                entity.Property(e => e.nTotalPrice_Plus)
                    .HasColumnType("decimal(18, 2)")
                    .HasComment("มูลค่าวัสดุรวม (บวก)");

                entity.Property(e => e.sCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้สร้างรายการ");

                entity.Property(e => e.sReason)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("เหตุผลที่ขอปรับปรุง");

                entity.Property(e => e.sRequestNo)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasComment("เลขที่ใบขอปรับปรุง Stock");

                entity.Property(e => e.sUpdateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("สร้างผู้ปรับปรุงรายการ");
            });

            modelBuilder.Entity<TB_Stock_Update_Approval>(entity =>
            {
                entity.HasKey(e => e.nID);

                entity.Property(e => e.nID).HasComment("รหัสการทำงาน");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ");

                entity.Property(e => e.nActionID).HasComment("รหัสปุ่มการทำรายการ TM_Option nID = 2");

                entity.Property(e => e.nRequestID).HasComment("รหัสรายการขอปรับปรุง Stock");

                entity.Property(e => e.nRoleID).HasComment("รหัสสิทธิ์การใช้งาน");

                entity.Property(e => e.sCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้สร้างรายการ");

                entity.Property(e => e.sNote)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("หมายเหตุ/เหตุผล");
            });

            modelBuilder.Entity<TB_Stock_Update_Material>(entity =>
            {
                entity.HasKey(e => new { e.nRequestID, e.nMaterialID });

                entity.Property(e => e.nRequestID).HasComment("รหัสรายการขอปรับปรุง Stock");

                entity.Property(e => e.nMaterialID).HasComment("รหัสวัสดุในระบบ");

                entity.Property(e => e.nAmount).HasComment("จำนวน");

                entity.Property(e => e.nPrice)
                    .HasColumnType("decimal(8, 2)")
                    .HasComment("ราคาวัสดุต่อชิ้น");

                entity.Property(e => e.nTotalPrice)
                    .HasColumnType("decimal(18, 2)")
                    .HasComment("มูลค่าวัสดุรวม");

                entity.Property(e => e.sCause)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("สาเหตุ");
            });

            modelBuilder.Entity<TB_User>(entity =>
            {
                entity.HasKey(e => e.sEmployeeID)
                    .HasName("PK_TB_User_1");

                entity.Property(e => e.sEmployeeID)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสพนักงานจาก PIS");

                entity.Property(e => e.IsActive).HasComment("สถานะ 1 = ใช้งาน, 0 ไม่ใช้งาน");

                entity.Property(e => e.IsDel).HasComment("สถานะการลบ 1 = ลบ, 0 ไม่ลบ");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ");

                entity.Property(e => e.dUpdate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ปรับปรุงรายการ");

                entity.Property(e => e.nRoleID).HasComment("รหัสสิทธิ์การใช้งาน");

                entity.Property(e => e.sCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้สร้างรายการ");

                entity.Property(e => e.sEmail)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasComment("อีเมล");

                entity.Property(e => e.sEmpCode_MG)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้อนุมัติ");

                entity.Property(e => e.sFirstName)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasComment("ชื่อ");

                entity.Property(e => e.sLastName)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasComment("นามสกุล");

                entity.Property(e => e.sOrgID)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสหน่วยงาน");

                entity.Property(e => e.sOrgName)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasComment("ชื่อหน่วยงาน");

                entity.Property(e => e.sPosName)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasComment("ชื่อตำแหน่ง");

                entity.Property(e => e.sTel)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("เบอร์โทรศัพท์");

                entity.Property(e => e.sUpdateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("สร้างผู้ปรับปรุงรายการ");
            });

            modelBuilder.Entity<TB_Vendor>(entity =>
            {
                entity.HasKey(e => e.nVendorID);

                entity.Property(e => e.nVendorID).HasComment("รหัสผู้ขาย");

                entity.Property(e => e.IsActive).HasComment("สถานะ 1 = ใช้งาน, 0 ไม่ใช้งาน");

                entity.Property(e => e.IsDel).HasComment("สถานะการลบ 1 = ลบ, 0 ไม่ลบ");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ");

                entity.Property(e => e.dUpdate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ปรับปรุงรายการ");

                entity.Property(e => e.sCompanyCode)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasComment("รหัสบริษัท");

                entity.Property(e => e.sCompanyName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อบริษัท");

                entity.Property(e => e.sContactName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อผู้ติดต่อ");

                entity.Property(e => e.sCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้สร้างรายการ");

                entity.Property(e => e.sDetail)
                    .HasMaxLength(2500)
                    .IsUnicode(false)
                    .HasComment("รายละเอียด");

                entity.Property(e => e.sEmail)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasComment("อีเมล");

                entity.Property(e => e.sTel)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("เบอร์ติดต่อ");

                entity.Property(e => e.sUpdateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("สร้างผู้ปรับปรุงรายการ");
            });

            modelBuilder.Entity<TB_Work>(entity =>
            {
                entity.HasKey(e => e.nWorkID);

                entity.Property(e => e.nWorkID).HasComment("รหัสลักษณะงาน");

                entity.Property(e => e.IsActive).HasComment("สถานะ 1 = ใช้งาน, 0 ไม่ใช้งาน");

                entity.Property(e => e.IsDel).HasComment("สถานะการลบ 1 = ลบ, 0 ไม่ลบ");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ");

                entity.Property(e => e.dUpdate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ปรับปรุงรายการ");

                entity.Property(e => e.nReasonID).HasComment("รหัสเหตุผลในการเบิก");

                entity.Property(e => e.sCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้สร้างรายการ");

                entity.Property(e => e.sDetail)
                    .HasMaxLength(2500)
                    .IsUnicode(false)
                    .HasComment("รายละเอียด");

                entity.Property(e => e.sName)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasComment("ลักษณะงาน");

                entity.Property(e => e.sUpdateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("สร้างผู้ปรับปรุงรายการ");
            });

            modelBuilder.Entity<TB_Work_Material>(entity =>
            {
                entity.HasKey(e => new { e.nWorkID, e.nMaterialID });

                entity.Property(e => e.nWorkID).HasComment("รหัสลักษณะงาน");

                entity.Property(e => e.nMaterialID).HasComment("รหัสวัสดุในระบบ");

                entity.Property(e => e.IsActive).HasComment("สถานะ 1 = ใช้งาน, 0 ไม่ใช้งาน");

                entity.Property(e => e.nAmount).HasComment("จำนวนที่แนะนำ");
            });

            modelBuilder.Entity<TM_Config>(entity =>
            {
                entity.HasKey(e => e.nID);

                entity.Property(e => e.nID)
                    .ValueGeneratedNever()
                    .HasComment("รหัสรายการ");

                entity.Property(e => e.nValue)
                    .HasColumnType("decimal(18, 2)")
                    .HasComment("ค่าแบบตัวเลข");

                entity.Property(e => e.sDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasComment("รายละเอียด");

                entity.Property(e => e.sName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อรายการ");

                entity.Property(e => e.sValue)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasComment("ค่าแบบตัวอักษร");
            });

            modelBuilder.Entity<TM_Menu>(entity =>
            {
                entity.HasKey(e => e.nMenuID);

                entity.Property(e => e.nMenuID)
                    .ValueGeneratedNever()
                    .HasComment("รหัสเมนู");

                entity.Property(e => e.IsActive).HasComment("สถานะ 1 = ใช้งาน, 0 ไม่ใช้งาน");

                entity.Property(e => e.IsBackend).HasComment("เป็นเมนูหลังบ้าน 1 = ใช่, 0 = ไม่ใช่");

                entity.Property(e => e.nHeadID).HasComment("รหัสเมนูหลัก");

                entity.Property(e => e.nLevel).HasComment("ลำดับเมนู");

                entity.Property(e => e.nOrder).HasComment("ลำดับการแสดงผล");

                entity.Property(e => e.sIcon)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasComment("สัญลักษณ์เมนู");

                entity.Property(e => e.sLink)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasComment("ลิงค์เมนู");

                entity.Property(e => e.sName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อเมนู");
            });

            modelBuilder.Entity<TM_Option>(entity =>
            {
                entity.HasKey(e => e.nID);

                entity.Property(e => e.nID)
                    .ValueGeneratedNever()
                    .HasComment("รหัสรายการ");

                entity.Property(e => e.sDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasComment("รายละเอียด");

                entity.Property(e => e.sName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อ");
            });

            modelBuilder.Entity<TM_Option_Sub>(entity =>
            {
                entity.HasKey(e => new { e.nID, e.nSubID });

                entity.Property(e => e.nID).HasComment("รหัสรายการ");

                entity.Property(e => e.nSubID).HasComment("รหัสย่อยรายการ");

                entity.Property(e => e.IsActive).HasComment("สถานะ 1 = ใช้งาน, 0 ไม่ใช้งาน");

                entity.Property(e => e.nOrder)
                    .HasColumnType("decimal(5, 2)")
                    .HasComment("ลำดับการแสดงผล");

                entity.Property(e => e.sDescription)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("รายละเอียด");

                entity.Property(e => e.sName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อ");
            });

            modelBuilder.Entity<TM_Permission>(entity =>
            {
                entity.HasKey(e => new { e.nRole, e.nMenuID });

                entity.Property(e => e.nRole).HasComment("รหัสสิทธิ์การใช้งาน");

                entity.Property(e => e.nMenuID).HasComment("รหัสเมนู");

                entity.Property(e => e.nPermission).HasComment("สิทธิ์การใช้งาน 2 = เพิ่ม/แก้ไข/ลบ, 1 = ดูรายละเอียด, 0 = ไม่มีสิทธิ์");
            });

            modelBuilder.Entity<TM_Step_Request>(entity =>
            {
                entity.HasKey(e => e.nStepID);

                entity.Property(e => e.nStepID)
                    .ValueGeneratedNever()
                    .HasComment("รหัสสถานะรายการ");

                entity.Property(e => e.sDetail)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("รายละเอียด");

                entity.Property(e => e.sName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อสถานะ");
            });

            modelBuilder.Entity<TM_Step_Stock_Update>(entity =>
            {
                entity.HasKey(e => e.nStepID);

                entity.Property(e => e.nStepID)
                    .ValueGeneratedNever()
                    .HasComment("รหัสสถานะรายการ");

                entity.Property(e => e.sDetail)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("รายละเอียด");

                entity.Property(e => e.sName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("ชื่อสถานะ");
            });

            modelBuilder.Entity<T_Log>(entity =>
            {
                entity.HasKey(e => e.nID);

                entity.Property(e => e.nID).HasComment("รหัสรายการ");

                entity.Property(e => e.dLog)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ทำรายการ");

                entity.Property(e => e.nMenuID).HasComment("รหัสเมนู");

                entity.Property(e => e.sEvent)
                    .IsUnicode(false)
                    .HasComment("รายละเอียดการทำงาน");

                entity.Property(e => e.sMenuName)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasComment("ชื่อเมนู");

                entity.Property(e => e.sUserID)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้ดำเนินการ");
            });

            modelBuilder.Entity<T_Log_Email>(entity =>
            {
                entity.HasKey(e => e.nID);

                entity.Property(e => e.nID).HasComment("รหัสรายการ");

                entity.Property(e => e.IsSuccess).HasComment("สถานะการส่ง 1 = สำเร็จ, 0 = ไม่สำเร็จ");

                entity.Property(e => e.dSend)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ส่งอีเมล");

                entity.Property(e => e.sCc)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasComment("อีเมล Cc");

                entity.Property(e => e.sMessage)
                    .IsUnicode(false)
                    .HasComment("เนื้อหาอีเมล");

                entity.Property(e => e.sMessage_Error)
                    .IsUnicode(false)
                    .HasComment("รายละเอียดกรณีส่งไม่สำเร็จ");

                entity.Property(e => e.sSubject)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasComment("หัวข้ออีเมล");

                entity.Property(e => e.sTo)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasComment("อีเมล To");
            });

            modelBuilder.Entity<T_Log_Error>(entity =>
            {
                entity.HasKey(e => e.nID);

                entity.Property(e => e.nID)
                    .ValueGeneratedNever()
                    .HasComment("รหัสรายการ");

                entity.Property(e => e.dLog)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ทำรายการ");

                entity.Property(e => e.sMessage)
                    .IsUnicode(false)
                    .HasComment("ข้อความ");

                entity.Property(e => e.sUserID)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้ดำเนินการในระบบ");
            });

            modelBuilder.Entity<T_Request>(entity =>
            {
                entity.HasKey(e => e.nRequestID);

                entity.Property(e => e.nRequestID).HasComment("รหัสรายการแบบคำขอเบิกวัสดุ");

                entity.Property(e => e.IsApproved_MG1).HasComment("ผู้จัดการระดับแผนกอนุมัติแล้ว 1 = ใช่, 0 = ไม่ใช่");

                entity.Property(e => e.IsApproved_MG2).HasComment("ผู้จัดการระดับส่วนอนุมัติแล้ว 1 = ใช่, 0 = ไม่ใช่");

                entity.Property(e => e.IsApproved_MG3).HasComment("ผู้จัดการระดับฝ่ายอนุมัติแล้ว 1 = ใช่, 0 = ไม่ใช่");

                entity.Property(e => e.IsCancel).HasComment("ยกเลิก 1 = ใช่, 0 = ไม่ใช่");

                entity.Property(e => e.IsFastTrack).HasComment("Fast Track 1 = ใช่, 0 = ไม่ใช่");

                entity.Property(e => e.IsRevisit).HasComment("ส่งกลับแก้ไข 1 = ใช่, 0 = ไม่ใช่");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ (วันที่ขอเบิก)");

                entity.Property(e => e.dReceiveDate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่รับวัสดุ");

                entity.Property(e => e.dUpdate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่ปรับปรุงรายการ");

                entity.Property(e => e.dUseDate)
                    .HasColumnType("date")
                    .HasComment("วันที่ต้องการใช้");

                entity.Property(e => e.nPay_TotalPrice)
                    .HasColumnType("decimal(18, 2)")
                    .HasComment("มูลค่าวัสดุรวม (อนุมัติ)");

                entity.Property(e => e.nReasonID).HasComment("รหัสเหตุผลในการเบิก");

                entity.Property(e => e.nRequest_TotalPrice)
                    .HasColumnType("decimal(18, 2)")
                    .HasComment("มูลค่าวัสดุรวม (เบิก)");

                entity.Property(e => e.nStepID).HasComment("รหัสสถานะรายการจากตาราง TM_Step_Request");

                entity.Property(e => e.nWorkID).HasComment("รหัสลักษณะงาน");

                entity.Property(e => e.sCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้สร้างรายการ (ผู้ขอเบิก)");

                entity.Property(e => e.sDetail_FastTrack)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasComment("หมายเหตุเพิ่มเติม (Fast Track)");

                entity.Property(e => e.sDetail_Reason)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasComment("หมายเหตุเพิ่มเติม (เหตุผลในการเบิก)");

                entity.Property(e => e.sEmpCode_MG1)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้จัดการระดับแผนกในระบบ");

                entity.Property(e => e.sEmpCode_MG2)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้จัดการระดับส่วนในระบบ");

                entity.Property(e => e.sEmpCode_MG3)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้จัดการระดับฝ่ายในระบบ");

                entity.Property(e => e.sGoodsIssueNo)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasComment("เลขที่ใบเบิก");

                entity.Property(e => e.sLocation)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("สถานที่ใช้งาน");

                entity.Property(e => e.sOrgID)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasComment("รหัสหน่วยงานของผู้ขอเบิก");

                entity.Property(e => e.sRecipient_EmployeeID)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้รับวัสดุ");

                entity.Property(e => e.sRequestNo)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasComment("เลขที่ใบขอเบิก");

                entity.Property(e => e.sUpdateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("สร้างผู้ปรับปรุงรายการ");
            });

            modelBuilder.Entity<T_Request_Approval>(entity =>
            {
                entity.HasKey(e => e.nID);

                entity.Property(e => e.nID)
                    .ValueGeneratedNever()
                    .HasComment("รหัสการทำงาน");

                entity.Property(e => e.dCreate)
                    .HasColumnType("datetime")
                    .HasComment("วันที่สร้างรายการ");

                entity.Property(e => e.nActionID).HasComment("รหัสปุ่มการทำรายการ TM_Option nID = 3");

                entity.Property(e => e.nRequestID).HasComment("รหัสรายการแบบคำขอเบิกวัสดุ");

                entity.Property(e => e.nRoleID).HasComment("รหัสสิทธิ์การใช้งาน");

                entity.Property(e => e.sCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasComment("รหัสผู้สร้างรายการ");

                entity.Property(e => e.sNote)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("หมายเหตุ/เหตุผล");
            });

            modelBuilder.Entity<T_Request_Material>(entity =>
            {
                entity.HasKey(e => new { e.nRequestID, e.nMaterialID, e.nID });

                entity.Property(e => e.nRequestID).HasComment("รหัสรายการแบบคำขอเบิกวัสดุ");

                entity.Property(e => e.nMaterialID).HasComment("รหัสวัสดุในระบบ");

                entity.Property(e => e.IsApprove).HasComment("อนุมัติ 1 = ใช่, 0 = ไม่ใช่");

                entity.Property(e => e.nPay_Amount).HasComment("จำนวน (จ่าย)");

                entity.Property(e => e.nPay_Price)
                    .HasColumnType("decimal(8, 2)")
                    .HasComment("ราคาวัสดุต่อชิ้น (จ่าย)");

                entity.Property(e => e.nPay_TotalPrice)
                    .HasColumnType("decimal(18, 2)")
                    .HasComment("มูลค่าวัสดุรวม (จ่าย)");

                entity.Property(e => e.nRequest_Amount).HasComment("จำนวน (เบิก)");

                entity.Property(e => e.nRequest_Price)
                    .HasColumnType("decimal(8, 2)")
                    .HasComment("ราคาวัสดุต่อชิ้น (เบิก)");

                entity.Property(e => e.nRequest_TotalPrice)
                    .HasColumnType("decimal(18, 2)")
                    .HasComment("มูลค่าวัสดุรวม (เบิก)");

                entity.Property(e => e.sNote)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasComment("หมายเหตุ/เหตุผล");
            });

            modelBuilder.Entity<V_Material_Category>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_Material_Category");

                entity.Property(e => e.dUpdate).HasMaxLength(4000);

                entity.Property(e => e.nGroupID)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.sActive)
                    .IsRequired()
                    .HasMaxLength(9)
                    .IsUnicode(false);

                entity.Property(e => e.sCategoryCode)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.sCategoryName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.sDetail)
                    .HasMaxLength(2500)
                    .IsUnicode(false);

                entity.Property(e => e.sGroupName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<V_Materials>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_Materials");

                entity.Property(e => e.nPrice).HasColumnType("decimal(8, 2)");

                entity.Property(e => e.nTotalPrice_Minus).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.nTotalPrice_Plus).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.sMaterialCode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.sMaterialName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.sReason)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.sUnitName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<V_Stock_Update>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_Stock_Update");

                entity.Property(e => e.dUpdate).HasColumnType("date");

                entity.Property(e => e.nCreateBy)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.sNote)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.sReason)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.sRequestNo)
                    .HasMaxLength(11)
                    .IsUnicode(false);

                entity.Property(e => e.sStep)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.sUpdate).HasMaxLength(4000);
            });

            modelBuilder.Entity<V_User>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_User");

                entity.Property(e => e.sEmployeeID)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.sName)
                    .HasMaxLength(401)
                    .IsUnicode(false);

                entity.Property(e => e.sOptSub)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.sPosition)
                    .HasMaxLength(403)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<V_Withdrawal_Status>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_Withdrawal_Status");

                entity.Property(e => e.sName)
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
