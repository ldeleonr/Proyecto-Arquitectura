create table puestos(
id_puesto varchar(8) not null,
nom_puesto varchar(20),
descripcion varchar(50),
id_depto varchar(8) not null,
primary key (id_puesto),
foreign key (id_depto)
references departamentos(id_depto)
);
create index I_id_puesto on puestos(id_puesto);

create table departamentos(
id_depto varchar(8) not null,
nombre_depto varchar(20),
primary key (id_depto)
);
create index I_id_depto on departamentos(id_depto);

create table solicitudes(
id_solicitud varchar(8) not null,
id_puesto varchar(8) not null,
dpi_solicitante varchar(13) not null,
cod_empleado varchar(8) not null,
fecha_solicitud date,
salario decimal(6,2),
estado_solicitud varchar(10),
cv_solicitante varchar(20),
primary key (id_solicitud),
foreign key (id_puesto)
references puestos(id_puesto),
foreign key (dpi_solicitante)
references solicitantes(dpi_solicitante),
foreign key (cod_empleado)
references empleados(cod_empleado)
);
create index I_id_solicitud on solicitudes(id_solicitud);

create table solicitantes(
dpi_solicitante varchar(13) not null,
correo_solicitante varchar(40),
telefono_solicitante varchar(15),
password_solicitante varchar(20),
primer_nombre varchar(15),
segundo_nombre varchar(15),
primer_apellido varchar(15),
segundo_apellido varchar(15),
primary key (dpi_solicitante)
);
create index I_dpi_solicitante on solicitantes(dpi_solicitante);

create table empleados(
cod_empleado varchar(8) not null,
dpi_empleado varchar(13),
nom_empleado varchar(50),
correo_empleado varchar(40),
usuario_empleado varchar(10),
password_empleado varchar(20),
primary key (cod_empleado)
);
create index I_cod_empleado on empleados(cod_empleado);
