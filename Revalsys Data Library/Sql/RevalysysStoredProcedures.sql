/****** Object:  StoredProcedure [dbo].[SpSelecttTest]    Script Date: 05/17/2021 01:57:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SpSelecttTest]
as
begin
	select * from TestDurations
end
GO
/****** Object:  StoredProcedure [dbo].[SpInsertTestDuration]    Script Date: 05/17/2021 01:57:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SpInsertTestDuration]
@TestName varchar(255),
@Hour int,
@Minute int,
@Second int
as
begin
	insert into TestDurations
	select @TestName,@Hour,@Minute,@Second
end
GO
/****** Object:  StoredProcedure [dbo].[SpinsertTest]    Script Date: 05/17/2021 01:57:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SpinsertTest]
@testName varchar(255),
@question varchar(max),
@option1 varchar(255),
@option2 varchar(255),
@option3 varchar(255),
@option4 varchar(255),
@answer int
as
begin
	insert into Tests 
	select @testName,@question,@option1,@option2,@option3,@option4,@answer
end
GO
/****** Object:  StoredProcedure [dbo].[SpInsertResult]    Script Date: 05/17/2021 01:57:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SpInsertResult]
@TestName varchar(255),
@UserName varchar(255),
@ResultValue int
as
begin
	delete from Results where UserName=@UserName and TestName=@TestName
	insert into Results
	select @UserName,@TestName,@ResultValue
end
GO
/****** Object:  StoredProcedure [dbo].[SpGetTestData]    Script Date: 05/17/2021 01:57:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SpGetTestData]
@TestName varchar(255)
as
begin
	select Id,TestName,Question,Option1,Option2,Option3,Option4,Answer as Answer from Tests where TestName=@TestName
end
GO
/****** Object:  StoredProcedure [dbo].[SpGetResults]    Script Date: 05/17/2021 01:57:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SpGetResults]
@TestName varchar(255)
as
begin
	select Id,UserName,TestName,ResultValue from Results where TestName=@TestName 
end
GO
