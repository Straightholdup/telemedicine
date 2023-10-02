class BaseServiceException(Exception):
    code = '10001'
    description = 'Base Service Exception'


class DoctorInformationDoesNotFull(BaseServiceException):
    code = '10002'
    description = 'Doctor information does not full'
