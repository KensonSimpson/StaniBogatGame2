FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore dependencies (cached unless csproj changes)
COPY StaniBogatApp/*.csproj ./StaniBogatApp/
RUN dotnet restore StaniBogatApp/StaniBogatApp.csproj

# Copy all source code and build
COPY . .
RUN dotnet publish StaniBogatApp/StaniBogatApp.csproj -c Release -o out

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "StaniBogatApp.dll"]
